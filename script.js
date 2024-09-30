document.addEventListener('DOMContentLoaded', function () {
    const progressBar = document.querySelector('.progress');
    const progressValueInput = document.getElementById('progressValue');
    const animateCheckbox = document.getElementById('isAnimate');
    const hiddenCheckbox = document.getElementById('isHidden');
  
    let currentValue = 50; 
    progressValueInput.value = currentValue;
    updateProgressBar(currentValue);


    const hideElementWithAnimation = (element) => {
      element.style.transition = 'opacity 0.5s ease';
      element.style.opacity = '0';
      setTimeout(() => {
        element.style.display = 'none';
      }, 500); 
    };
  
    const showElementWithAnimation = (element) => {
      element.style.display = 'block';
      element.style.opacity = '0';
      setTimeout(() => {
        element.style.transition = 'opacity 0.5s ease';
        element.style.opacity = '1';
      }, 10);
    };
  
    function updateProgressBar(value) {
      const degrees = (value / 100) * 360;
      const progressColor = value === 100 ? '#74ff7d' : '#2146ff'; 
      progressBar.style.background = `conic-gradient(${progressColor} ${degrees}deg, #ededed ${degrees}deg)`;
    }
  
    function animateProgressBar(startValue, endValue) {
      const duration = 1000; 
      const startTime = performance.now();
  
      function animate(time) {
        const elapsedTime = time - startTime;
        const progress = Math.min(elapsedTime / duration, 1); 
        const currentValue = startValue + (endValue - startValue) * progress;
        updateProgressBar(currentValue);
  
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }
  
      requestAnimationFrame(animate);
    }
  
    progressValueInput.addEventListener('input', function (e) {
        const value = parseInt(e.target.value);
        if (value >= 0 && value <= 100) {
          if (animateCheckbox.checked) {
            animateProgressBar(currentValue, value); 
          } else {
            updateProgressBar(value); 
          }
          currentValue = value;
        }
    });
  
    animateCheckbox.addEventListener('change', function (e) {
  if (e.target.checked) {
    progressBar.classList.add('rotating');
  } else {
    progressBar.classList.remove('rotating');
  }
});

  
    hiddenCheckbox.addEventListener('change', function (e) {
      if (e.target.checked) {
        hideElementWithAnimation(progressBar);
      } else {
        showElementWithAnimation(progressBar);
      }
    });
  });
  