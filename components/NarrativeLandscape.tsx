import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Theme, LandscapeNode } from '../types';
import { COLORS } from '../constants';

interface NarrativeLandscapeProps {
  data: Theme[];
}

interface BubbleNode {
  name: string;
  count: number;
  netSentiment: number;
  x: number;
  y: number;
  r: number;
  color: string;
}

const NarrativeLandscape: React.FC<NarrativeLandscapeProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !svgRef.current) return;

    // 1. Setup Dimensions
    const { width } = wrapperRef.current.getBoundingClientRect();
    const height = 360;
    const margin = { top: 60, right: 60, bottom: 60, left: 60 };
    const centerY = height / 2;

    // Clear previous
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 2. Scales
    // X Scale: Sentiment (-100 to 100)
    const xScale = d3.scaleLinear()
      .domain([-100, 100])
      .range([margin.left, width - margin.right]);

    // Radius Scale: Volume
    const maxCount = d3.max(data, d => d.count) || 100;
    const rScale = d3.scaleSqrt()
      .domain([0, maxCount])
      .range([35, 75]); // Large enough to hold text

    // 3. Calculate Layout (Deterministic)
    const nodes: BubbleNode[] = data.map((d, i) => {
      const netSentiment = d.sentiment.positive - d.sentiment.negative;
      
      // Manual clustering adjustments to prevent total overlap while keeping x-position accurate
      // We stagger y based on index to create a "cloud" effect for the negative cluster
      let yOffset = 0;
      if (netSentiment < 0) {
         // Simple zigzag for negative cluster
         yOffset = (i % 2 === 0 ? -1 : 1) * (25 + (i * 5));
      }

      return {
        name: d.name,
        count: d.count,
        netSentiment: netSentiment,
        x: xScale(netSentiment),
        y: centerY + yOffset,
        r: rScale(d.count),
        color: netSentiment > 0 ? COLORS.positive : COLORS.negative
      };
    });

    // 4. Draw Visuals

    // --- X-Axis Line ---
    svg.append("line")
        .attr("x1", margin.left)
        .attr("y1", centerY)
        .attr("x2", width - margin.right)
        .attr("y2", centerY)
        .attr("stroke", "#E5E5E5")
        .attr("stroke-width", 2);

    // --- Center Marker ---
    svg.append("line")
        .attr("x1", xScale(0))
        .attr("y1", centerY - 10)
        .attr("x2", xScale(0))
        .attr("y2", centerY + 10)
        .attr("stroke", "#D4D4D4")
        .attr("stroke-width", 2);

    // --- Axis Labels ---
    const labelY = height - 20;
    
    // Negative Label
    svg.append("text")
        .attr("x", margin.left)
        .attr("y", labelY)
        .attr("text-anchor", "start")
        .attr("font-family", "Inter, sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", COLORS.negative)
        .attr("letter-spacing", "0.05em")
        .text("← NEGATIVE / FRICTION");

    // Positive Label
    svg.append("text")
        .attr("x", width - margin.right)
        .attr("y", labelY)
        .attr("text-anchor", "end")
        .attr("font-family", "Inter, sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", COLORS.positive)
        .attr("letter-spacing", "0.05em")
        .text("POSITIVE / RESONANCE →");


    // --- Bubbles ---
    const nodeGroup = svg.selectAll("g.node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    // Circle
    nodeGroup.append("circle")
      .attr("r", d => d.r)
      .attr("fill", d => d.color)
      .attr("opacity", 0.9)
      .style("mix-blend-mode", "multiply") // Editorial overlap effect
      .attr("stroke", "white")
      .attr("stroke-width", 1.5);

    // Text inside bubble
    nodeGroup.each(function(d) {
        const g = d3.select(this);
        const maxTextWidth = d.r * 1.6; // Allow text to use most of width
        
        const text = g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.3em") // Vertical center approx
            .attr("fill", "white")
            .attr("font-family", "Inter, sans-serif")
            .attr("font-weight", "600")
            .attr("font-size", "10px") // Tiny text as requested
            .style("pointer-events", "none")
            .style("text-shadow", "0px 1px 2px rgba(0,0,0,0.1)");

        // Wrap text logic
        const words = d.name.split(/\s+/).reverse();
        let word;
        const lines: string[] = [];
        let line: string[] = [];
        const lineHeight = 1.1; // ems
        
        // Simple dummy tspan for measuring
        let tspan = text.append("tspan").attr("x", 0).attr("y", 0).attr("dy", 0);
        
        // Calculate lines
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node()!.getComputedTextLength() > maxTextWidth && line.length > 1) {
                line.pop();
                lines.push(line.join(" "));
                line = [word];
                tspan.text(word);
            }
        }
        lines.push(line.join(" "));
        tspan.remove(); // Clean up dummy
        
        // Render lines centered
        const totalLines = lines.length;
        const startDy = -((totalLines - 1) * lineHeight) / 2;
        
        lines.forEach((l, i) => {
            text.append("tspan")
                .attr("x", 0)
                .attr("y", 0)
                .attr("dy", i === 0 ? `${startDy}em` : `${lineHeight}em`) // Relative to previous line
                .text(l);
        });
    });

  }, [data]);

  return (
    <div ref={wrapperRef} className="w-full relative">
      <h3 className="font-serif text-3xl mb-8 text-editorial-text">Narrative Landscape</h3>
      
      {/* Visualization Container */}
      <div className="mb-10 bg-[#FDFDFC] border border-stone-100 rounded-sm">
        <svg ref={svgRef} className="w-full h-[360px] overflow-visible" />
        <div className="px-6 pb-4 pt-0 text-center">
             <p className="text-[10px] text-stone-400 font-sans uppercase tracking-wider">
                Figure 2.0 — Polarized Sentiment Distribution
            </p>
        </div>
      </div>

      {/* Analysis Text */}
      <div className="mb-12 font-serif text-lg leading-relaxed text-stone-800 space-y-6 max-w-prose">
        <p>
          The narrative map shows a sharp split: a single positive theme—<strong>The 'Magic' of Instant Synthesis</strong>—dominates the right side, while three friction-heavy themes cluster tightly on the left. The bubble sizes reveal that most of the conversation volume gathers around negative experiences, not scattered complaints.
        </p>
        <p>
          On the negative side, <strong>The 'Black Hole' Paradox</strong>, <strong>The 'Amnesiac Assistant'</strong>, and <strong>Brand Promise Mismatch</strong> form a dense cluster because they reflect the same failure mode: the system repeatedly breaks continuity. Users encounter lost diagrams, erased conversations, or missing links, and these discrete problems roll up into a shared feeling that the tool cannot support extended, iterative reasoning.
        </p>
        <p>
          The shape of the map reveals the real contradiction: users love how quickly the product absorbs information, but the moment they try to build on that information, the workflow collapses. This split—speed without stability—explains the entire sentiment landscape and defines the product’s strategic fork in the road.
        </p>
      </div>
    </div>
  );
};

export default NarrativeLandscape;