import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export const HelpSection = () => {
  return (
    <section className="dark:text-gray-50 my-8 self-start ml-1 w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Como posso baixar um vídeo do youtube?
          </AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal list-inside ml-3 mt-3">
              <li>Cole o link do vídeo</li>
              <li>Clique no botão Baixar.</li>
              <li>Selecione o formato de vídeo desejado.</li>
              <li>Clique no botão Download.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
