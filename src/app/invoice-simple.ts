export interface InvoiceSimple {
    _id: string;
    trader: string;
    in_out: string;
    in_date: string;
    seller: string;
    deal_type: string;
    invoice: string;
    origin: string;
    item: string;
    unit: string;
    quality: string;
    weight: string;
    in_number: number;
    in_sum: number;
    seller_no: number;
    out_date: string;
    out_number: number;
    out_sum: number;
    out_purchase: string;
    unstoring: string [];
}
