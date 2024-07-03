import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

export const scrapWebsite = async (website) => {
  const loader = new CheerioWebBaseLoader(website);
  const docs = await loader.load();
  return docs;
};
