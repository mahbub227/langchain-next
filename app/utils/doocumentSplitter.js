import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const documentSplitter = async (docs) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });

  const splitDocs = await splitter.splitDocuments(docs);
  return splitDocs;
};
