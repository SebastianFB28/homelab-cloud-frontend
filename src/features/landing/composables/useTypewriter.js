import { ref, onMounted } from 'vue';

export function useTypewriter(fullText, typingSpeed = 50, startDelay = 0) {
  const displayText = ref('');
  const isTyping = ref(false);

  onMounted(() => {
    setTimeout(() => {
      isTyping.value = true;
      let i = 0;
      
      const interval = setInterval(() => {
        if (i < fullText.length) {
          displayText.value += fullText.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          isTyping.value = false; // Termina de escribir
        }
      }, typingSpeed);
      
    }, startDelay);
  });

  return { displayText, isTyping };
}