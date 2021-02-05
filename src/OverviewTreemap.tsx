import React from 'react';
import * as d3 from 'd3';
import { largeCurrencyFormatter } from './utils/Formatters';


interface IProps {
    data: any;
    height: number;
    width: number;
}

export const OverviewTreemap: React.FC<IProps> = ({
    data,
    height,
    width
}: IProps) => {
    const svgRef = React.useRef(null);

    const renderTreemap = React.useCallback(() => {
        d3.selectAll('g').remove();

        const svg = d3.select(svgRef.current);
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
          .attr('width', d => d.x1 - d.x0)
          .attr('height', d => d.y1 - d.y0)
          .attr('fill', (d: any) => colorScale(d.data.name));
        nodes
          .append('text')
          .text((d: any) => `${d.data.name}`)
          .attr('font-size', d => (d.x1 - d.x0) / 5)
          .attr('x', d => (d.x1 - d.x0) / 2)
          .attr('y', d => (d.y1 - d.y0) / 2)
          .attr('dy', '.35em')
          .style("text-anchor", "middle");

        var tooltip = d3.select("body")
          .append("div")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("visibility", "hidden")
          .style("background", "#fff")
          .style("padding", '10px')
          .style("pointer-events", 'none')
          .style("width", "170px")
          .style("height", "100px")
          .style("color", "#000000");
      
        nodes
            .on("mouseover", function(d) {
                tooltip.html(`
                    <div>
                        <p>${d.target.__data__.data.name}</p>
                        <p>Market Cap: ${largeCurrencyFormatter(d.target.__data__.value)}</p>
                    </div>
                `);
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function(e) {
                if (e.pageX > (width - 70)) {
                    tooltip
                        .style("top", (e.pageY)+"px")
                        .style("left", (e.pageX-170)+"px")
                        .style("text-align", 'right');
                } else {
                    tooltip
                        .style("top", (e.pageY)+"px")
                        .style("left",(e.pageX)+"px")
                        .style("text-align", 'left');
                }
                return tooltip
            })
            .on("mouseout", function() {
                return tooltip
                        .style("visibility", "hidden")
            });
    }, [data, height, width]);
     
    React.useEffect(() => {
        renderTreemap();
    }, [data, renderTreemap]);

    return (
        <div className="treemap" style={{ width: '100%' }}>
            <svg style={{ height: '100%', width: '100%' }} ref={svgRef} />
        </div>
    );
};

