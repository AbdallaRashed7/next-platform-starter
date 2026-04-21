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
                
                {/* Google Analytics Tracking Code */}
                <script 
                    async 
                    src="https://www.googletagmanager.com/gtag/js?id=G-83KVGCWSJT">
                </script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-83KVGCWSJT');
                    `
                }} />

                {/* PayPal SDK Integration with your Client ID */}
                {/* ## This script enables the Smart Payment Buttons in the frontend ## */}
                <script 
                    src="https://www.paypal.com/sdk/js?client-id=AaC6kFQxbUyBeqHrVp_UbOmlgWnZqxv-8LqqC8YDNGbv7iVhlt9myZXgNIKPUC5p3Ez-np99wRxo4j0c&currency=USD">
                </script>
            </head>
            
            <body className="antialiased" style={{ backgroundColor: '#ffffff', color: '#000000', margin: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <div style={{ flexGrow: 1 }}>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
