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
  const today = new Date();
  currentFlashcard.due_date = today;

  const nextDueDate = new Date(
    new Date(currentFlashcard.due_date)?.setUTCDate(
      today.getUTCDate() + interval
    )
  );

  if (
    currentFlashcard.status === FlashcardStatus.NEW ||
    currentFlashcard.status === FlashcardStatus.NEW_1 ||
    currentFlashcard.status === FlashcardStatus.NEW_2
  ) {
    if (quality === FlashcardQuality.REPEAT) {
      currentFlashcard.due_date = today;
      currentFlashcard.failed_consecutive_attempts += 1;
      currentFlashcard.interval = 0;
      if (currentFlashcard.status === FlashcardStatus.NEW_1) {
        currentFlashcard.status = FlashcardStatus.NEW;
      } else if (currentFlashcard.status === FlashcardStatus.NEW_2) {
        currentFlashcard.status = FlashcardStatus.NEW_1;
      }
    } else {
      if (currentFlashcard.status === FlashcardStatus.NEW) {
        currentFlashcard.status = FlashcardStatus.NEW_1;
      } else if (currentFlashcard.status === FlashcardStatus.NEW_1) {
        currentFlashcard.status = FlashcardStatus.NEW_2;
      } else {
        currentFlashcard.status = FlashcardStatus.GRADUATED;
      }
      // quality is remembered
      currentFlashcard.failed_consecutive_attempts = 0;
      currentFlashcard.due_date = nextDueDate;
    }
  } else if (currentFlashcard.status === FlashcardStatus.GRADUATED) {
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
    } else {
      if (quality === FlashcardQuality.EASILY_REMEMBERED) {
        currentFlashcard.ease_factor += 15;
      }
      currentFlashcard.due_date = nextDueDate;
      currentFlashcard.failed_consecutive_attempts = 0;
    }
  }
};
