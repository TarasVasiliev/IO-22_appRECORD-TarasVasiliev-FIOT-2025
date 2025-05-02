//Task1
const images = [
    {
        preview: 'https://picsum.photos/id/655/300/200',
        original: 'https://picsum.photos/id/655/1200/800',
        description: 'Автобус',
    },
    {
        preview: 'https://picsum.photos/id/22/300/200',
        original: 'https://picsum.photos/id/22/1200/800',
        description: 'Людина',
    },
    {
        preview: 'https://picsum.photos/id/700/300/200',
        original: 'https://picsum.photos/id/700/1200/800',
        description: 'Риба летун',
    },
    {
        preview: 'https://picsum.photos/id/500/300/200',
        original: 'https://picsum.photos/id/500/1200/800',
        description: 'Будівля',
    },
    {
        preview: 'https://picsum.photos/id/425/300/200',
        original: 'https://picsum.photos/id/425/1200/800',
        description: 'Кавові зерна',
    },
    {
        preview: 'https://picsum.photos/id/1020/300/200',
        original: 'https://picsum.photos/id/1020/1200/800',
        description: 'Ведмідь',
    },
    {
        preview: 'https://picsum.photos/id/256/300/200',
        original: 'https://picsum.photos/id/256/1200/800',
        description: 'Гори',
    },
    {
        preview: 'https://picsum.photos/id/900/300/200',
        original: 'https://picsum.photos/id/900/1200/800',
        description: 'Океан',
    },
    {
        preview: 'https://picsum.photos/id/965/300/200',
        original: 'https://picsum.photos/id/965/1200/800',
        description: 'Міст',
    },
];

const galleryEl = document.querySelector('.gallery');
const markup = images
    .map(({ preview, original, description }) => {
        return `
        <li class="gallery-item">
          <img
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </li>
      `;
    })
    .join('');
galleryEl.innerHTML = markup;

galleryEl.addEventListener('click', (event) => {
    event.preventDefault();

    const target = event.target;
    if (target.nodeName !== 'IMG') return;

    const largeImageURL = target.dataset.source;
    const description = target.alt;

    const instance = basicLightbox.create(`
      <img src="${largeImageURL}" alt="${description}" />
      <p style="color: white; text-align: center; margin-top: 10px;">${description}</p>
    `);

    instance.show();
});
//Task2
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

const STORAGE_KEY = 'feedback-form-state';

let formData = {
    email: '',
    message: ''
};

// Завантажити дані з localStorage при старті
loadFormData();

// Делегування: onInput
form.addEventListener('input', (event) => {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Сабміт
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (formData.email.trim() === '' || formData.message.trim() === '') {
        alert('Fill please all fields');
        return;
    }

    console.log('Form submitted:', formData);

    // Очистити все
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = { email: '', message: '' };
});

// Відновити дані з локального сховища
function loadFormData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        formData = JSON.parse(savedData);
        emailInput.value = formData.email || '';
        messageTextarea.value = formData.message || '';
    }
}