export class cartItem {
  constructor(
    public id: string,
    public product: string,
    public quantity: number,
    public price: number,
    public images: string[] = []
  ) {}
}
