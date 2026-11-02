import{readFile} from "node:fs/promises"
import { parse } from "csv-parse/sync"


export class csvreader
{
//read dowloaded CSV

static async readcsv()
{
const filecontent = await readFile("downloads/item-exclusions.csv","utf-8");
return parse(filecontent,{columns: true});
}

}