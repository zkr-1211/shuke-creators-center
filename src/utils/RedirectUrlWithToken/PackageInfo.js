const buttonBefore = 'padding: 1px; border-radius: 3px 0 0 3px;  color: #fff';
const buttonAfter = 'padding: 1px; border-radius: 0 3px 3px 0;  color: #fff';
const buttonBackground = 'background:transparent';

export default () => {
    console.log(
        `%c ${process.env.VUE_APP_TITLE} %c ${
            process.env.VUE_APP_VERSION || '1.0.0'
        } %c`,
        `background:#35495e; ${buttonBefore}`,
        `background:#2c99ff; ${buttonAfter}`,
        buttonBackground
    );

    console.log(
        `%c Build Date %c ${process.env.VUE_APP_BUILD_TIME} %c`,
        `background:#35495e; ${buttonBefore}`,
        `background:#1475b2; ${buttonAfter}`,
        buttonBackground
    );

    console.log(
        `%c Environment %c ${process.env.NODE_ENV || 'development'} %c`,
        `background:#35495e; ${buttonBefore}`,
        `background:#41b883; ${buttonAfter}`,
        buttonBackground
    );
};
