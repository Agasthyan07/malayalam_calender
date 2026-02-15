export const metadata = {
    title: 'Disclaimer - Malayalam Calendar',
    alternates: {
        canonical: 'https://malayalamcalendar.site/disclaimer',
    },
};

export default function Disclaimer() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Disclaimer</h1>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p className="lead text-xl text-gray-600 dark:text-gray-400 mb-8 border-l-4 border-yellow-500 pl-4 py-1">
                    The information provided on Malayalam Calendar is for general informational and educational purposes only.
                </p>

                <h2>1. General Disclaimer</h2>
                <p>
                    All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                </p>
                <p>
                    Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site.
                    Your use of the site and your reliance on any information on the site is solely at your own risk.
                </p>

                <h2>2. Astrological and Cultural Information Disclaimer</h2>
                <p>
                    Our website provides traditional astrological calculations, festival dates, and auspices timings (Muhurtham) based on standard almanacs (Panchangam) followed in Kerala.
                </p>
                <ul>
                    <li><strong>Variations:</strong> Astrological calculations can vary based on different schools of thought (e.g., Drik Ganita vs. Surya Siddhanta). Differences may also arise due to geographic location.</li>
                    <li><strong>Not Professional Advice:</strong> The astrological predictions and advice found on this site should not be treated as professional advice (medical, legal, financial, or psychological).</li>
                    <li><strong>Personal Belief:</strong> Astrology is a subject of belief. We respect individual choices to follow or not follow these traditions.</li>
                </ul>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900/50 mb-6">
                    <p className="m-0 text-sm">
                        <strong>Note:</strong> We strongly advise users to consult with a qualified personal astrologer for making significant life decisions such as marriage dates, housewarming ceremonies, or naming ceremonies.
                        The generic data provided here serves as a guideline and may not account for your specific birth chart (Janma Kundali).
                    </p>
                </div>

                <h2>3. External Links Disclaimer</h2>
                <p>
                    The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising.
                    Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                </p>
                <p>
                    We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising.
                    We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.
                </p>

                <h2>4. Affiliates Disclaimer</h2>
                <p>
                    The Site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links.
                    Our affiliates include various reputable service providers. This comes at no extra cost to you and helps support the maintenance of this free calendar service.
                </p>

                <h2>5. Errors and Omissions Disclaimer</h2>
                <p>
                    While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, Malayalam Calendar is not responsible for any errors or omissions, or for the results obtained from the use of this information.
                    All information in this site is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.
                </p>
                <p>
                    In no event will Malayalam Calendar, its related partnerships or corporations, or the partners, agents or employees thereof be liable to you or anyone else for any decision made or action taken in reliance on the information in this Site or for any consequential, special or similar damages, even if advised of the possibility of such damages.
                </p>
            </div>
        </div>
    );
}
