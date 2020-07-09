import React from 'react';

function FooterComponent(){
    return(
        <div>
            <footer class='page-footer deep-purple darken-4'>
                <div class="container">
                    <div class="row">
                        <div class="col s12 l6">
                            <h5>Sonam Shenoy</h5>
                            <h6>About Me</h6>
                            <p>An enthusiastic web developer, painter and coder.<br/>
                            Passionate to learn something new everyday!</p>
                        </div>

                        <div class="col s12 l6">
                            <h5>Connect</h5>
                            <ul>
                            <li><a href='https://github.com/sonamkshenoy' class='grey-text text-lighten-3'><i class="fa fa-github"></i>&nbsp;Github</a></li>
                            <li>Liked my website? :P I would be extremely pleased to know!</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default FooterComponent;