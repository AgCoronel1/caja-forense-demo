export interface Product {
    id?: number;                     
    title: string;                   
    description: string;             
    price: number;                   
    discountPercentage?: number;     
    rating?: number;                 
    stock: number;                  
    brand?: string;                  
    category: string;               
    thumbnail?: string;              
    images?: string[];               
    sku?: string;                 
    dimensions?: ProductDimensions; 
    warrantyInformation?: string;   
    shippingInformation?: string;   
    availabilityStatus?: string;    
    returnPolicy?: string;          
    minimumOrderQuantity?: number;    
    weight: any;           
  }
  
  export interface ProductDimensions {
    width?: number;
    height?: number;
    depth?: number;
  }
  