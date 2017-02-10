export class Product {
  constructor(
    public productCode: string='', public productName: string='', public shape: string='', public quantity: number=0,
    public dimensions:string='',public caratWeight:string='',public color:string='',public meanRating:string='',public price: number=0
    ) {}
}