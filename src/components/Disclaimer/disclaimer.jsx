import React from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
    width: 95%;
    display: grid;
    margin: 0 auto;
    grid-gap: 20px;
    margin-top: 20px;
`

const Section = styled.div`
    border: lightgrey 1px solid;
    background: ghostwhite;
    padding: 2%;
    border-radius: 10px;
`
export const Disclaimer = (props) => {

 return (
      <MainWrapper>

      
      <Section>
        Last updated: September 29th 2018<br /><br />
        By using Hangman.education, you accept these terms of use in full.<br />
        If you disagree with these terms of use or any part of them, you cannot use this site, and you should exit immediately.<br />
        Hangman.education owners, webmasters and staff are collectively referred to herein as "Hangman.education", "the service", "us" or "we". <br />
      </Section>
      <Section>        
        <h3>Disclaimer</h3>
        <ul>
          <li>There is no warranty of any kind. Consider Hangman.education as an "As is" service.</li>
          <li>The content of the pages of this website is subject to change without notice.</li>
          <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law</li>
          <li>In no event shall Hangman.education or contributors be liable for any direct, indirect, incidental special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption) however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of the service provided, even if advised of the possibility of such damage.</li>
          <li>Hangman.education may include links to other third-party websites. These links are provided for your convenience. They do not signify that we endorse the websites. We have no responsibility for the content of the linked websites.</li>
          <li>Nothing contained in this agreement is in derogation of our right to comply with governmental, court and law enforcement requests or requirements relating to your use of the website.</li>
        </ul>
        </Section>
        <Section>
        <h3>Copyrights</h3>
        <ul>
          <li>Please  <a className="outlink" href="contact-us">contact us</a> if you want to use our game elsewhere</li>
          <li>All software, art and web pages (except for user generated games content) available on this web site are the copyrighted work of Hangman.education</li>
          <li>All brands, logos or product names are or may be trademarks of and are used to identify products and services of, their respective owners.</li>
          <li>If you believe that your work has been copied in a way that constitutes copyright infringement, please <a className="outlink" href="contact-us">contact us</a> immediately</li>
        </ul>
        </Section>
        <Section>
        <h3>User Generated Content</h3>
        <ul>
          <li>You are solely responsible for the content that you publish or display on the site (such as your user name)</li>
          <li>You will not post or transmit to other users, any defamatory, abusive, obscene, profane, offensive, sexually oriented, threatening, harassing, racially offensive, or ill material, or any material that infringes or violates another party's rights (including, but not limited to, intellectual property rights, and rights of privacy and publicity)</li>
          <li>Hangman.education cannot guarantee the uptime or availability of games that you upload, we reserve the right to remove them anytime or to discontinue the service</li>
        </ul>
        </Section>
        <Section>
        <h2>Privacy Policy</h2>
        <h3>Third Party Advertisements</h3>
        <ul>
          <li>Hangman.education is using third-party companies, such as Google, in order to display advertisements. These third-party companies will place and read cookies and/or web beacons in order to collect statistics about their advertisements.</li>
          <li>In order to improve the site, we are using Google Analytics Demographics and Interest Reporting to collect anonymous statistics about visits to the site.</li>
          <li>You can opt-out of Google Analytics for Display Advertising by using </li>
        </ul>
        </Section>
      </MainWrapper>
    );
}