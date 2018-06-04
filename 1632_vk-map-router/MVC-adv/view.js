export default {
    render(templateName, model) { // имя шаблона, данные
        templateName = templateName + 'Template';

        const templateElement = document.getElementById(templateName);
        const templateSource = templateElement.innerHTML;
        const renderFn = Handlebars.compile(templateSource);

        return renderFn(model);
    }
};

// задача - отображение данных
