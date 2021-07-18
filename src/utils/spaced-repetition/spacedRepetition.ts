import {
  FlashcardInterface,
  FlashcardLearningStatus,
  FlashcardQuality,
  FlashcardStatus,
} from "../../types";

export const spacedRepetition = (
  currentFlashcard: FlashcardInterface,
  quality: FlashcardQuality,
  interval: number,
  learning_status: FlashcardLearningStatus
) => {
  currentFlashcard.interval = interval;
  currentFlashcard.learning_status = learning_status;

  const today = new Date();

  const nextDueDate = new Date(
    currentFlashcard.due_date?.setUTCDate(today.getUTCDate() + interval)
  );

  if (currentFlashcard?.status === FlashcardStatus.NEW) {
    currentFlashcard.due_date = today;
    if (quality === FlashcardQuality.REPEAT) {
      currentFlashcard.failed_consecutive_attempts += 1;
      currentFlashcard.interval = 0;
      currentFlashcard.due_date = today;
    } else {
      if (currentFlashcard?.status === FlashcardStatus.NEW) {
        currentFlashcard.status = FlashcardStatus.NEW_1;
      } else if (currentFlashcard?.status === FlashcardStatus.NEW_1) {
        currentFlashcard.status = FlashcardStatus.NEW_2;
      } else {
        currentFlashcard.status = FlashcardStatus.GRADUATED;
      }
      // quality is remembered
      currentFlashcard.failed_consecutive_attempts = 0;
      currentFlashcard.due_date = nextDueDate;
    }
  } else if (currentFlashcard?.status === FlashcardStatus.GRADUATED) {
    if (quality === FlashcardQuality.REPEAT) {
      if (currentFlashcard.failed_consecutive_attempts !== 0) {
        if (currentFlashcard.ease_factor < 150) {
          currentFlashcard.ease_factor = 130;
        } else {
          currentFlashcard.ease_factor -= 20;
        }
      }
      currentFlashcard.failed_consecutive_attempts += 1;
      currentFlashcard.interval = 0;
      currentFlashcard.due_date = today;
    } else {
      if (quality === FlashcardQuality.EASILY_REMEMBERED) {
        currentFlashcard.ease_factor += 15;
      }
      currentFlashcard.due_date = nextDueDate;
      currentFlashcard.failed_consecutive_attempts = 0;
    }
  }
};
