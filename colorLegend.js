const colorLegend = (selection, props) => {
  const { color, circleRadius, spacingX, spacingY, textOffset } = props;
  let x, y;

  const groups = selection.selectAll('g').data(color.domain());
  const groupsEnter = groups.enter().append('g').attr('class', 'tick');
  groupsEnter.merge(groups).attr('transform', (d, i) => {
    //console.log(i);
    if (i === 0) {
      x = 0;
      y = 0;
    } else if (i !== 0 && i % 3 === 0) {
      y = i * spacingY;
      x = 0;
    } else {
      x += spacingX;
    }
    return `translate(${x},${y})`;
  });
  groups.exit().remove();

  groupsEnter
    .append('circle')
    .merge(groups.select('circle'))
    .attr('r', (d) => circleRadius)
    .attr('fill', color)
    .attr('stroke', 'black');

  groupsEnter
    .append('text')
    .merge(groups.select('text'))
    .text((d) => d.split('.')[1])
    .attr('dy', '0.32em')
    .attr('x', textOffset);
};
