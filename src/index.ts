const generateButton = document.getElementById('generate');
const linkInput = document.getElementById('url');
const codeInput = document.getElementById('discount_code');
const outputLink = document.getElementById('generated_link');

outputLink?.addEventListener('click', () => {
    const text = outputLink.innerHTML;
    const notification = document.getElementById('notification');
    if (text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }, () => {
                alert('Failed to copy to clipboard');
            });
    }
});

generateButton?.addEventListener('click', () => {

    if (!linkInput || !codeInput) {
        alert('Please enter link and discount code');
        return;
    }

    if (!outputLink instanceof HTMLElement) {
        return;
    }

    if (!(linkInput instanceof HTMLInputElement) || !(codeInput instanceof HTMLInputElement)) {
        return;
    }

    const link = linkInput.value;
    const code = codeInput.value;

    if (!link || !code) {
        alert('Please enter link and discount code');
        return;
    }

    localStorage.setItem('link', link);
    localStorage.setItem('code', code);

    outputLink.innerHTML = generateLink(link, code);
});

const generateLink = (link: string, code: string) => {
    const url = new URL(link);
    const discountFragment = `discount/${code}`;

    let domain = url.hostname;
    let path = url.pathname;
    let protocol = url.protocol;
    let params = url.searchParams;
    let paramsString = params.size > 0 ? '&' + params.toString() : '';

    return `${protocol}//${domain}/${discountFragment}/?redirect=${path}${paramsString}`;
}

window.onload = () => {
    const link = localStorage.getItem('link');
    const code = localStorage.getItem('code');

    if (link && code) {
        if (linkInput instanceof HTMLInputElement && codeInput instanceof HTMLInputElement) {
            linkInput.value = link;
            codeInput.value = code;
        }

        if (outputLink) {
            outputLink.innerHTML = generateLink(link, code);
        }
    }
}