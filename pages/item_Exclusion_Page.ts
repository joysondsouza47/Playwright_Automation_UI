import{Page,Locator,expect} from "@playwright/test"


export class ItemExclusion
{
    private page:Page;
    private itemExclusionPageLocator:Locator;
    private itemExclusionAddLocator:Locator;
    private strategicRadioLocator:Locator;
    private legacyRadioLocator:Locator;
    private addItemidLocator:Locator;
    private addStartDateLocator:Locator;
    private selectFromDateLocator:Locator;
    private addEndDateLocator:Locator;
    private selectEndDateLocator:Locator;
    private addReasonDropdownLocator:Locator;
    private addItemExclusionSubmitLocator:Locator;
    private addItemExclusionCancelLocator:Locator;
    private searchTextLocator:Locator;
    private searchItemLocator:Locator;
    private editStartDateCheckboxLocator:Locator;
    private editEndDateCheckboxLocator:Locator;
    private selectAllLocator:Locator;
    private bulkEditLocator:Locator;
    private bulkDeleteLocator:Locator;
    private tableLocator:Locator;
    private pagesLocator:Locator;
    private pageslastLocator:Locator;
    private ItemExclusionDownloadLocator:Locator;


    constructor(page:Page,item:string)
    {
        this.page = page;
        this.tableLocator = page.getByRole('table');
        this.itemExclusionPageLocator = page.getByText('Item Exclusions', { exact: true });
        this.itemExclusionAddLocator = page.getByRole('button', { name: 'Add' });
        this.bulkEditLocator = page.getByRole('button', { name: 'Edit' });
        this.bulkDeleteLocator = page.getByRole('button', { name: 'Delete' });
        this.strategicRadioLocator = page.getByRole('radio', { name: 'Strategic' });
        this.legacyRadioLocator = page.getByRole('radio', { name: 'Legacy' });
        this.addItemidLocator = page.getByRole('textbox');
        this.addStartDateLocator = page.getByLabel('Start Store Delivery Date *');
        this.selectFromDateLocator = page.locator("tbody tr td[aria-disabled='false']");
        this.addEndDateLocator = page.getByRole('combobox', { name: 'End Store Delivery Date' });
        this.selectEndDateLocator = page.locator("tbody tr td[aria-disabled='false']");
        this.addReasonDropdownLocator = page.getByLabel('Reason *');
        this.addItemExclusionSubmitLocator = page.getByRole('button', { name: 'Submit' });
        this.addItemExclusionCancelLocator = page.getByRole('button', { name: 'Cancel' });
        this.searchTextLocator = page.locator("table tr").filter({hasText:`${item}`});
        this.searchItemLocator = page.getByRole('searchbox', { name: 'Item ID' });
        this.editStartDateCheckboxLocator = page.getByRole('checkbox', { name: 'Edit Start Store Delivery Date' });
        this.editEndDateCheckboxLocator = page.getByRole('checkbox', { name: 'Edit End Store Delivery Date' });
        this.selectAllLocator = page.getByRole('checkbox', { name: 'Select all' });
        this.pagesLocator = page.locator('#ds-c-select-_R_14anpftb_');
        this.pageslastLocator = page.getByLabel('Rows Per Page');
        this.ItemExclusionDownloadLocator = page.getByRole('button', { name: 'Export All as CSV' });
    }


    async AddItemExclusion(itemid:string,startdate?:any,enddate?:any)
    {
        await expect(this.itemExclusionPageLocator).toBeVisible();
        await this.itemExclusionAddLocator.click();
        await this.strategicRadioLocator.check();
        await this.addItemidLocator.fill(itemid);
        //await this.addStartDateLocator.fill(startdate);
        await this.addStartDateLocator.click();
        await this.selectFromDateLocator.nth(0).click();
        //await this.addEndDateLocator.fill(enddate);
        await this.addEndDateLocator.click();
        await this.selectEndDateLocator.nth(1).click();
        await this.addReasonDropdownLocator.selectOption("Seasonal PQ Lines");
        await expect(this.addItemExclusionSubmitLocator).toBeEnabled({timeout:15000});
        await this.addItemExclusionSubmitLocator.click();
        await expect(this.strategicRadioLocator).toBeHidden({timeout:15000});
    }


    async editItemExclusion(item:string)
    {
        await expect(this.searchItemLocator).toBeEnabled({timeout:10000});
        await this.searchItemLocator.fill(item);
        await this.searchTextLocator.getByRole('button').nth(0).click();
        //await this.editStartDateCheckboxLocator.check();
        await expect(this.editEndDateCheckboxLocator).toBeVisible();
        await this.editEndDateCheckboxLocator.check();
        await this.addEndDateLocator.clear();
        await expect(this.addItemExclusionSubmitLocator).toBeEnabled();
        await this.addItemExclusionSubmitLocator.click()

        await expect(this.editEndDateCheckboxLocator).toBeHidden({timeout:15000})
    }

    async deleteitemExclusion(item:string)
    {
        //await this.pageslastLocator.selectOption('100');
        await expect(this.searchItemLocator).toBeEnabled({timeout:10000});
        await this.searchItemLocator.fill(item);
        await this.searchTextLocator.getByRole('button').last().click();
        await expect(this.addItemExclusionSubmitLocator).toBeEnabled();
        await this.addItemExclusionSubmitLocator.click()

        await expect(this.searchTextLocator).toHaveCount(0,{timeout:15000});
    }


    async bulkEdititemExclusion()
    {
        await this.pagesLocator.selectOption('100');
        await expect(this.selectAllLocator).toBeVisible();
        await this.selectAllLocator.check();
        await this.bulkEditLocator.click();
        await expect(this.editEndDateCheckboxLocator).toBeVisible();
        await this.editEndDateCheckboxLocator.check();
        await this.addEndDateLocator.clear();
        await expect(this.addItemExclusionSubmitLocator).toBeEnabled();
        await this.addItemExclusionSubmitLocator.click()

        await expect(this.editEndDateCheckboxLocator).toBeHidden({timeout:15000})
    }

    async bulkDeleteitemExclusion()
    {
        await this.pagesLocator.selectOption('100');
        await expect(this.selectAllLocator).toBeVisible();
        await this.selectAllLocator.check();
        await this.bulkDeleteLocator.click();
        await expect(this.addItemExclusionSubmitLocator).toBeEnabled();
        await this.addItemExclusionSubmitLocator.click()

        await expect(this.tableLocator).toBeHidden({timeout:15000})
        
    }

    async ItemExclusionDownload()
    {
        const downloadPromise = this.page.waitForEvent("download");
        await this.ItemExclusionDownloadLocator.click()
        const download = await downloadPromise;
        await download.saveAs(`downloads/${download.suggestedFilename()}`);
    }


}
