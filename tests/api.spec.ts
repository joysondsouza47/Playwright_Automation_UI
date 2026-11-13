import{test,expect} from "@playwright/test"


test("api test", async ({request})=>
{

    const payload =  [{"sainIds":["4jwyx4ns"],"skuIds":"$undefined","reason":"Event/Promotion","startDate":"2026-11-09","endDate":"2026-11-10"}];
    const response = await request.post("https://sc-sor-food-sc-sor-food-ofv-ui-e2e.int.stg.jspaas.uk/item-exclusions",
    {
        
           data: payload

    });
    console.log(response.status());

    const getresponse = await request.get("https://sc-sor-food-sc-sor-food-ofv-ui-e2e.int.stg.jspaas.uk/item-exclusions",
    {
        data: {strategicId: "4jwyx4ns"}
    });
    console.log(getresponse.status());

    
    
})
//