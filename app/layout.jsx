import '../styles/globals.css';

export const metadata = {
    title: 'FIXATA | Web Security Intelligence',
    description: 'Professional AI-driven vulnerability assessment'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
                {/* كود تتبع الزيارات - Analytics */}
                <script 
                    async 
                    src="https://www.googletagmanager.com/gtag/js?id=G-83KVGCWSJT">
                </script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-XXXXXXXXXX');
                    `
                }} />
            </head>
            {/* حذفنا الـ bg-blue-900 والـ text-white ووضعنا خلفية بيضاء */}
            <body className="antialiased" style={{ backgroundColor: '#ffffff', color: '#000000', margin: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    {/* سنضع المحتوى مباشرة دون الحاجة لمكونات قديمة تسبب مشاكل */}
                    <div style={{ flexGrow: 1 }}>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
