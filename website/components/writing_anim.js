

/**
 * Enables writing animation by utilizing a client-side library named Vara.js through
 * a React component. React complains about client-side scripts messing with the server-side HTML, thus
 * preventing the text animation from displaying.
 * Thanks to this informative guide for help:
 * https://www.gatsbyjs.org/docs/using-client-side-only-packages/#workaround-2-add-client-side-package-via-cdn
 * 
 * @return Empty JSX fragment.
 */
class WritingAnim extends React.Component {
    
    // With componentDidMount(), it's possible to run jQuery functions within SSR applications
    componentDidMount() {
        $(function () {
            var font_size = 64;

            // Following Bootstrap's fixed-breakthrough strategy, I adjust the font size based on each specific
            // width size
            if      (window.screen.width < 600)  font_size = 30;
            else if (window.screen.width < 900)  font_size = 32;
            else if (window.screen.width < 1200) font_size = 56;
            else if (window.screen.width < 2000) font_size = 56;

            /**
             * Create Vara object from vara.js library.
             * 
             * @param element           The HTML class/id that the animation will be placed in.
             * @param JSON              URL that contains a JSON file for a font to be used for converting into svg.
             * @param text_and_options  Contains array of objects, each packed with text and various options (see: http://vara.akzhy.com/documentation/ for more information).
             * @param options           Contains more options that affects every object in the array above (see: http://vara.akzhy.com/documentation/ for more information).
             */
            new Vara("#writing-title",
                "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
                [
                    {
                        text: "My writing portfolio! :)",
                        id: "subtitle",
                        duration: 5000,
                        delay: 500
                    }
                ],
                {
                    fontSize: font_size,
                    autoAnimation: true,
                    textAlign: "center",
                });
        })
    }

    // IMPORTANT! Don't return anything!
    render() { return <></> }
}

export default WritingAnim;