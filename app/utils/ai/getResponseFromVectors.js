import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { OpenAIModel } from "../models";
import { createVectorStore } from "../createVectorStore";
import { documentSplitter } from "../doocumentSplitter";
import { scrapWebsite } from "../scrapWebsite";

export const getResponseFromVectors = async (input) => {
  const prompt = ChatPromptTemplate.fromTemplate(
    `Answer the user's question.
          Context: {context}
          Question: {input}`
  );
  const chain = await createStuffDocumentsChain({
    llm: OpenAIModel,
    prompt,
  });
  // scrap website data
  const docs = await scrapWebsite(
    "https://js.langchain.com/v0.2/docs/introduction/"
  );
  // use in memory vector store
  const splitDocs = await documentSplitter(docs);
  const vectorStore = await createVectorStore(splitDocs);

  //retrieve the data from vector store
  const retriever = vectorStore.asRetriever({
    k: 2, // total number of documents to return, default is 3
  });
  const retrievalChain = await createRetrievalChain({
    combineDocsChain: chain,
    retriever,
  });
  const response = await retrievalChain.invoke({
    input,
  });
  console.log(response);
  return response?.answer;
};
