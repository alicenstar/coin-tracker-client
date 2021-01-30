import React from 'react';
import * as d3 from 'd3';


interface IProps {
    data: any;
    height: number;
    width: number;
}
    //   .sum((d) => d.market_cap)

export const OverviewTreemap: React.FC<IProps> = ({ data, height, width }: IProps) => {
    const svgRef = React.useRef(null);

    const renderTreemap = React.useCallback(() => {
        const svg = d3.select(svgRef.current);
        const fontSize = 12;
        svg.attr('width', width).attr('height', height);
        const root = d3
          .hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value! - a.value!);
        const treemapRoot = d3.treemap().size([width, height]).padding(3)(root);
        const nodes = svg
          .selectAll('g')
          .data(treemapRoot.leaves())
          .join('g')
          .attr('transform', (d) => `translate(${d.x0},${d.y0})`);
        const fader = (color: any) => d3.interpolateRgb(color, '#fff')(0.3);
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));
        nodes
          .append('rect')
          .attr('width', (d) => d.x1 - d.x0)
          .attr('height', (d) => d.y1 - d.y0)
          .attr('fill', (d: any) => colorScale(d.data.name));
        nodes
          .append('text')
          .text((d: any) => `${d.data.name} ${d.data.value}`)
          .attr('font-size', `${fontSize}px`)
          .attr('x', 3)
          .attr('y', fontSize);
    }, [data, height, width]);
     
    React.useEffect(() => {
        renderTreemap();
    }, [data, renderTreemap]);

    return (
        <div className="treemap">
            <svg ref={svgRef} />
        </div>
    )
}

