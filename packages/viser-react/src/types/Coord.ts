interface IRectCoordProps {
  type?: 'rect';
  direction?: string;
}

interface IPolarProps {
  type?: 'polar' | 'theta' | 'helix';
  direction?: string;
  radius?: number;
  innerRadius?: number;
  startAngle?: number;
  endAngle?: number;
}

type Coord = IRectCoordProps | IPolarProps;

export default Coord;
