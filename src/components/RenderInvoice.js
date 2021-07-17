import { useEffect, useState } from "react";
import easyinvoice from 'easyinvoice';

export default function RenderInvoice(props) {
    console.log(props)
    let id = props.match.params.id
let [ invoicedata,setinvoicedata] = useState([]);
    
    useEffect( () => {
        async function fetchdata(){
            await fetch(`https://invoice-backendapp.herokuapp.com/invoice/list/${id}`, {
                method: "POST",
                body: JSON.stringify({ id }),
                headers: {
                    "content-type": "application/json"
                }
            })
                .then(res => {
                    return res.json();
                }).then((data) => {
                    console.log(data)
                   setinvoicedata([data])
                })
        }
       fetchdata();
    },[id])

    

invoicedata.map((obj)=>{
    var data = {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE
        //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
        "currency": "USD", //See documentation 'Locales and Currency' for more info
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png", //or base64
        "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64 //img or pdf
        "sender": {
            "company": obj.invoice.companyname,
            "address": obj.invoice.address,
            "zip": "1234 AB",
            "city": "Sampletown",
            "country": "Samplecountry"
      
        },
        "client": {
               "company": obj.invoice.clientcompanyname,
               "address": obj.invoice.clientaddress,
               "zip": "4567 CD",
               "city": "Clientcity",
               "country": "Clientcountry"
      
        },
        "invoiceNumber":obj.invoice.invoiceno,
        "invoiceDate": obj.invoice.invoicedate,
        "products":obj.invoice.row,
        "bottomNotice": "Kindly pay your invoice within 15 days.",
        //Used for translating the headers to your preferred language
        //Defaults to English. Below example is translated to Dutch
        // "translate": { 
        //     "invoiceNumber": "Factuurnummer",
        //     "invoiceDate": "Factuurdatum",
        //     "products": "Producten", 
        //     "quantity": "Aantal", 
        //     "price": "Prijs",
        //     "subtotal": "Subtotaal",
        //     "total": "Totaal" 
        // }
    };
    var elementId = 'pdf';
easyinvoice.createInvoice(data, function(result) {
    easyinvoice.render(elementId, result.pdf, function(){
        console.log('Invoice rendered!');
    });
});
return data;
})





    return <>
    <div id="pdf" style={{ "text-align": "center" }}> 
  
    </div>
    
</>
}