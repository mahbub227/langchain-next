import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Document } from "langchain/document";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { OpenAIModel } from "../models";

export const getBasicResponse = async (input) => {
  const documentA = new Document({
    pageContent: "Shamsul Alam is a data scientist!",
  });
  const documentB = new Document({
    pageContent: "Mahbub Ul Alam is a software developer at BJIT Limited!",
  });
  const documentC = new Document({
    pageContent:
      "Shamsul Alam is the elder brother of Mahbub Ul Alam. Zion Rahman is a brilliant guy, he works for Suzuki. Zion Rahman is cousin of Shamsul Alam",
  });

  // scrap website data
  const loader = new CheerioWebBaseLoader(
    "https://js.langchain.com/v0.2/docs/introduction/"
  );

  const docs = await loader.load();

  const prompt = ChatPromptTemplate.fromTemplate(
    `Answer the user's question.
      Context: {context}
      Question: {input}`
  );

  const chain = await createStuffDocumentsChain({
    llm: OpenAIModel,
    prompt: prompt,
  });

  const response = await chain.invoke({
    input,
    context: [documentA, documentB, documentC, ...docs],
  });
  return response;
};
