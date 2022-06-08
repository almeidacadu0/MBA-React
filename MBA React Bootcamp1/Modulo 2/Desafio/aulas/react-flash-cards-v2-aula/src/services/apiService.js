import { read, exclude, create, edit } from './httpService';
import { getNewId } from './idService';

export async function apiGetAllFlashCards() {
  const allFlashCards = await read('/flashcards');
  //console.log(allFlashCards);
  return allFlashCards;
}

export async function apiDeleteFlashCard(cardId) {
  await exclude(`/flashcards/${cardId}`);
}
export async function apiCreateFlashCard(title, description) {
  //await exclude(`/flashcards/${cardId}`);
  const newFlashCard = create('/flashcards', {
    id: getNewId(),
    title,
    description,
  });

  return newFlashCard;
}
export async function apiUpdateFlashCard(cardId, title, description) {
  //await exclude(`/flashcards/${cardId}`);
  const updatedFlashCard = edit(`/flashcards/${cardId}`, {
    title,
    description,
  });

  return updatedFlashCard;
}
