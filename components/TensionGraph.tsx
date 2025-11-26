import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Theme } from '../types';
import { COLORS } from '../constants';

interface TensionGraphProps {
  data: Theme[];
}

const TensionGraph: React.FC<TensionGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !svgRef.current) return;

    const { width } = wrapperRef.current.getBoundingClientRect();
    const height = 450;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Prepare Nodes
    const nodes = data.map((d, i) => ({ 
      id: d.name, 
      group: (d.sentiment.positive > d.sentiment.negative) ? 1 : 2,
      ...d 
    }));

    // Generate Links based on "Tension"
    // Tension is high if one is very positive and one is very negative
    const links: any[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        
        const sentimentDiff = Math.abs(
            (n1.sentiment.positive - n1.sentiment.negative) - 
            (n2.sentiment.positive - n2.sentiment.negative)
        );

        // Only create a link if there is significant tension or they are part of the same discourse volume
        if (sentimentDiff > 50) {
            links.push({
                source: n1.id,
                target: n2.id,
                value: sentimentDiff / 10 // Thickness
            });
        }
      }
    }

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw Links (Fault lines)
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#EF4444") // Red for tension
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", d => Math.sqrt(d.value));

    // Draw Nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g");

    // Node shape (Diamond for tension points)
    node.append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("rx", 4)
      .attr("x", -10)
      .attr("y", -10)
      .attr("fill", d => d.group === 1 ? COLORS.positive : COLORS.negative)
      .attr("transform", "rotate(45)")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Labels
    node.append("text")
      .text(d => d.name)
      .attr("x", 16)
      .attr("y", 4)
      .attr("font-family", "Inter, sans-serif")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("fill", COLORS.textMain)
      .attr("paint-order", "stroke")
      .attr("stroke", COLORS.editorial.bg)
      .attr("stroke-width", 3);

    // Annotate "Fault Lines"
    if (links.length > 0) {
       const maxLink = links.sort((a,b) => b.value - a.value)[0];
       // Wait for sim to tick a bit to find position
    }

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

  }, [data]);

  return (
    <div ref={wrapperRef} className="w-full mt-12">
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="font-serif text-2xl text-editorial-text">Narrative Tension</h3>
        <span className="text-xs font-sans text-red-500 uppercase tracking-widest font-bold">Conflict Network</span>
      </div>
      <p className="font-sans text-sm text-editorial-neutral mb-6 max-w-prose">
        The network reveals "fault lines" where user expectations sharply diverge. 
        Thicker red lines indicate high polarity contrast between themes.
      </p>
      <svg ref={svgRef} className="w-full h-[450px] border-t border-b border-stone-200 bg-stone-50/50" />
    </div>
  );
};

export default TensionGraph;
