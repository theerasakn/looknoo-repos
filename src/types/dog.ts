/** Dog profile model */
export interface Dog {
  id: string;
  userId: string;
  name: string;
  breed?: string;
  size: 'S' | 'M' | 'L' | 'XL';
  photo?: string;
  vaccineComplete: boolean;
  vaccineBooklet: boolean;
  fleaPrevention: boolean;
  allergies?: string;
}
