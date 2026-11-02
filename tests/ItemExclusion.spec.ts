import{test,expect} from "@playwright/test"
import { ItemExclusion } from "../pages/item_Exclusion_Page";
import { additems, multipleitems } from "../test-data/ItemData";
import { csvreader } from "../utils/Itemexclusionfilereader";

test("Item add/edit/delete from Exclusion", async({page})=>
{
    const additemexclusion = new ItemExclusion(page,additems.singleitem);
    await page.goto("https://sc-sor-food-sc-sor-food-ofv-ui-e2e.int.stg.jspaas.uk/item-exclusions");
    //add
    await additemexclusion.AddItemExclusion(additems.singleitem)
    console.log("Item added successfully!")
    //search edit
    await additemexclusion.editItemExclusion(additems.singleitem);
    console.log("Item edited successfully!")
    //search delete
    await additemexclusion.deleteitemExclusion(additems.singleitem);
    console.log("Item deleted successfully!")
})

test("Items add/edit/delete from Exclusion",async ({page})=>
{
    test.setTimeout(600000);
    await page.goto("https://sc-sor-food-sc-sor-food-ofv-ui-e2e.int.stg.jspaas.uk/item-exclusions");
    for (const item of multipleitems)
    {
        const additemexclusion = new ItemExclusion(page,additems.singleitem);
        await additemexclusion.AddItemExclusion(item);
    }
    console.log("Items added successfully!")
    for (const item of multipleitems)
    {
        const additemexclusion = new ItemExclusion(page,item);
        await additemexclusion.editItemExclusion(item);
    }
    console.log("Items edited successfully!")
    for (const item of multipleitems)
    {
        const additemexclusion = new ItemExclusion(page,item);
        await additemexclusion.deleteitemExclusion(item);
    }
    console.log("Items deleted successfully!")

})

test("Bulk Items add/edit/delete from Exclusion", async({page})=>
{
    const additemexclusion = new ItemExclusion(page,additems.singleitem);
    await page.goto("https://sc-sor-food-sc-sor-food-ofv-ui-e2e.int.stg.jspaas.uk/item-exclusions");
    //bulk add
    await additemexclusion.AddItemExclusion(additems.multiitem)
    console.log("Items added in bulk successfully!")
} )


test("ItemExclusion List download and compare", async({page})=>
{
    const additemexclusion = new ItemExclusion(page,additems.singleitem);  
    await page.goto("https://sc-sor-food-sc-sor-food-ofv-ui-e2e.int.stg.jspaas.uk/item-exclusions")
    await additemexclusion.ItemExclusionDownload();
    console.log("File downloaded!")
    const records = await csvreader.readcsv();

    const found = records.some((row:any)=>
    row["SainId"] === "mwjjsqde");

    expect(found).toBe(true);
    console.log("File data comparision susscessful!")
})

test("Bulk Items edit/delete from Exclusion", async({page})=>
{
    const additemexclusion = new ItemExclusion(page,additems.singleitem);
    await page.goto("https://sc-sor-food-sc-sor-food-ofv-ui-e2e.int.stg.jspaas.uk/item-exclusions");
    //bulk edit
    await additemexclusion.bulkEdititemExclusion();
    console.log("Items edited in bulk successfully!")
    //bulk delete
    await additemexclusion.bulkDeleteitemExclusion();
    console.log("Items deleted in bulk successfully!")
} )
