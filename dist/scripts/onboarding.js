function startOnboarding() {
  const intro = introJs(); // Use global introJs from CDN
  intro.setOptions({
    steps: [
      {
        element: document.querySelector('#compressSection'),
        intro: 'اینجا می تونید تصاویرتون رو فشرده کنید تا حجمشون کم بشه!',
        position: 'bottom'
      },
      {
        element: document.querySelector('#resizeSection'),
        intro: 'برای تغییر اندازه تصاویر، از این بخش استفاده کنید.',
        position: 'bottom'
      },
      {
        element: document.querySelector('#cropSection'),
        intro: 'تصاویرتون رو برش بدید و قسمت های دلخواه رو نگه دارید.',
        position: 'bottom'
      },
	        {
	    element: document.querySelector('#canvasSection'),
        intro: 'تصاویرتون رو تغییر اندازه بوم بدید و قسمتهای دلخواه رو نگه دارید. و یا کم کنید.',
        position: 'bottom'
      },
      {
        element: document.querySelector('#advancedSection'),
        intro: 'واترمارک، فیلترها و ویرایش های پیشرفته رو اینجا اعمال کنید.',
        position: 'bottom'
      },
      {
        element: document.querySelector('#convertSection'),
        intro: 'فرمت تصاویر رو به PNG، JPEG یا فرمت های دیگه تغییر بدید.',
        position: 'bottom'
      },
      {
        element: document.querySelector('#bgRemoveSection'),
        intro: 'پس زمینه تصاویر رو با یه کلیک حذف کنید!',
        position: 'bottom'
      }
    ].filter(step => step.element), // Filter out steps with null elements
    nextLabel: 'بعدی',
    prevLabel: 'قبلی',
    doneLabel: 'تمام',
    showProgress: true,
    tooltipClass: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg p-4 rounded-lg',
    highlightClass: 'border-2 border-blue-500 rounded-lg'
  });

  // Start onboarding if first visit
  if (!localStorage.getItem('onboardingCompleted')) {
    intro.start();
    localStorage.setItem('onboardingCompleted', 'true');
  }

  // Allow manual restart
  document.getElementById('startOnboarding')?.addEventListener('click', () => {
    intro.start();
  });
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', startOnboarding);

export { startOnboarding };