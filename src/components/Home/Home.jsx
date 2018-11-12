import React from "react";
import styled from "styled-components"
import { Link } from 'react-router-dom'
import * as loading from '../images/images';


const Wrapper = styled.div`

		display: grid;
		margin: 0 auto;

    margin-top: 10px;
    @media only screen and (min-width: 320px)  { 
      width: 95%;
      grid-gap:5px;
      margin-top: 10px;
    }
    @media only screen and (min-width: 768px)  {  
      width: 70%;
      grid-gap: 20px;
      margin-top: 20px;
    } 
    @media only screen and (min-width: 1024px) { 
      width: 70%;
      grid-gap: 20px;
      margin-top: 20px;
    }

`

const Banner = styled.div`
		border: 1px solid lightgrey;
    padding: 5%;
		border-radius: 10px;
		text-align: center;
`

const Header = styled.div`
  color:#6b6b6b;
  font-size: 2.5em; 
`

const Button = styled.div`
    display:flex;
    width: 25%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    background: #aa00ff;
    padding: 10px;
    color: white;
    border-radius: 10px;
    text-align: center;
    max-height: 25px;
    &:hover{
      background: white;
      color:#aa00ff;
      border: 1px solid;
      cursor:pointer;
    }
 `
 const Header2 = styled.div`
  display:grid;
  color: #6b6b6b;
  font-size: 2em;
  text-align: center; 
`

const Image = styled.img`
  padding-top: 20px;
  margin: 0 auto;
`

 const InfoBlock = styled.div`
  align-items: center;
  justify-content: center;
  display: grid;
  border-radius: 10px;
  border: 1px solid lightgrey;
  padding: 10px;
  @media only screen and (min-width: 320px)  { 
    grid-template-columns: 1fr;    
    padding: 2px; 
  }
  @media only screen and (min-width: 768px)  {  
    grid-template-columns: 1fr 1fr; 
  } 
  @media only screen and (min-width: 1024px) { 
  }

`

const Info = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.3em
  color: #6b6b6b;

`

export const Home = (props) => {
    return (
        <Wrapper>
          <InfoBlock>
            <div>
            <Header2>Good for homework</Header2>
            <Info>Record a presentation, narative, or story.</Info>
            </div>
            <Image src={loading.homework()}/>
          </InfoBlock>
            <InfoBlock>
            <Image src={loading.presentation()}/>
            <div>
            <Header2>Great for presentations</Header2>
            <Info>No more blurry projected screen.</Info>
            </div>            
          </InfoBlock>
          <Banner>        
           <Link to="/castly" ><Button >GET STARTED</Button></Link>
           </Banner>
        </Wrapper>
    );
};