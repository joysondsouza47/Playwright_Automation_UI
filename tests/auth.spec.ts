import{test, expect} from "@playwright/test"



test("Authentication client application",async ({page})=>
{
    await page.goto("https://sc-sor-food-sc-sor-food-ofv-ui-e2e.int.stg.jspaas.uk/item-exclusions");
    await page.pause();
    await expect(page.locator("input[type='search']:nth-child(1)").nth(1)).toBeVisible();
    await page.context().storageState({
        path:'playwright/.auth/user.json'
    })

})