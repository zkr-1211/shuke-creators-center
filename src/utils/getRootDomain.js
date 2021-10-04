const COOKIE_KEY = '__rT_dM__' + new Date().getTime();
const CookieRegExp = new RegExp('(^|;)\\s*' + COOKIE_KEY + '=1');
const Y1970 = new Date(0).toUTCString();

function getRootDomain() {
    const domain = document.domain || location.hostname;
    const list = domain.split('.');
    let len = list.length;

    while (len--) {
        try {
            let root = list.slice(len).join('.');
            let cookieData = `${COOKIE_KEY}=1;domain=.${root}`;
            document.cookie = cookieData;
            if (CookieRegExp.test(document.cookie)) {
                document.cookie = `${cookieData};expires=${Y1970}`;
                return root;
            }
            // eslint-disable-next-line no-empty
        } catch (error) {}
    }

    return document.domain || window.location.hostname;
}

export { getRootDomain };
