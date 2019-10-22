import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import { Option, PersonWithFoldingHands, Close } from '../atoms';
import { Busy, Error } from '../molecules';

import { HighRiskOfTheft, Where } from '../util/brv';
import useRandomVehicle from '../util/db';

const Wrapper = styled.div`
    background:    #FFFFFF;
    border-radius: .25rem;
    margin:        auto;

    header {
        display:         flex;
        flex-direction:  row;
        align-items:     center;
        justify-content: space-between;
        padding:         1rem;
        margin:          0 0 1rem 0;

        border-bottom: .125rem solid hsla(0, 0%, 0%, .08);

        svg {
            width:  4rem;
            height: auto;
        }

        & > svg {
            margin: 0 2rem 0 1rem;
        }

        & > a {
            display: block;
            width:   4rem;
            height:  4rem;
            cursor:  pointer;

            border-radius: 2rem;

            &:hover, &:focus {
                background: hsla(0, 0%, 0%, .08);
                outline:    none;                
            }

            svg {
                width:  2rem;
                height: auto;
                margin: 1rem;
            }
        }
    }
`;

const CategoryWrapper = styled.div`
    display:        flex;
    flex-direction: row;
    flex-wrap:      wrap;
    padding:        1rem;

    & > * {
        flex: 0 0 calc(100% - 2rem);

        @media only screen and (min-width: 64em) {
            flex: 0 0 calc(50% - 2em);
        }

        @media only screen and (min-width: 80em) {
            flex: 0 0 calc(33.33333% - 2rem);
        }

        @media only screen and (min-width: 105em) {
            flex: 0 0 calc(25% - 2rem);
        }
    }
`;

const Category = styled.div`
    display:        flex;
    flex-direction: column;

    font-size: 1rem;
    margin:    0 0 2rem 2rem;
`;

const QueryOption = ({ children, id, where = [], onClick }) => (
    <Option
        onClick={ () => onClick(id, where) }
        onKeyDown={ ({ key }) => { if (key === 'Enter') onClick(id, where) } }
    >
        { children }
    </Option>
);

const Selector = ({ onVehicle, onCancel }) => {
    const node = useRef();
    const { next, loading, error } = useRandomVehicle();

    useEffect(
        () => {
            if (node.current) {
                const firstNode = node.current.querySelector('a');

                if (firstNode) {
                    firstNode.focus();
                }
            }

            const closeOnEscape = ({ key }) => {
                if (key === 'Escape') {
                    onCancel();
                }
            };

            document.addEventListener('keydown', closeOnEscape);

            return () => {
                document.removeEventListener('keydown', closeOnEscape);
            }
        },
        [ onCancel ],
    );

    const handleSelect = (id, where) => {
        next(
            id,
            where,
            onVehicle
        );
    };

    if (loading) {
        return (
            <Busy>
                Bezig met een kenteken uitzoeken...
            </Busy>
        );
    }

    if (error) {
        return (
            <Error
                onClose={ onCancel }
            >
                { error }
            </Error>
        );
    }

    return (
        <Wrapper>
            <header>
                <PersonWithFoldingHands />
                <a
                    title="Sluiten"
                    onClick={ onCancel }
                    tabIndex={ 1 }
                >
                    <Close />
                </a>
            </header>
            <CategoryWrapper
                ref={ node }
            >

                {/* Personenautos */}
                <Category>
                    <QueryOption
                        onClick={ handleSelect }
                        id="personenauto"
                        where={ [
                            Where.Personenauto,
                            Where.M1,
                            Where.GeenTaxi,
                            Where.GeenOldtimer,
                            Where.GeenCamper,
                        ] }
                    >
                        Personenauto
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="personenauto-nieuw"
                        where={ [
                            Where.Personenauto,
                            Where.M1,
                            Where.GeenTaxi,
                            Where.GeenOldtimer,
                            Where.GeenCamper,
                            `datum_eerste_afgifte_nederland >= ${ DateTime.local().plus({ days: -1 }).toFormat('yyyyLLdd') }`,
                        ] }                    
                    >
                        Sinds gisteren op kenteken
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="personenauto-vermogen"
                        where={ [
                            Where.Personenauto,
                            Where.M1,
                            Where.GeenTaxi,
                            Where.GeenOldtimer,
                            Where.GeenCamper,
                            "vermogen_massarijklaar > 0.12",
                        ] }                    
                    >
                        Hoog relatief vermogen
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="personenauto-catwaarde"
                        where={ [
                            Where.Personenauto,
                            Where.M1,
                            Where.GeenTaxi,
                            Where.GeenOldtimer,
                            Where.GeenCamper,
                            "catalogusprijs > 80000",
                        ] }                    
                    >
                        Hoog relatief vermogen
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="personenauto-diefstalgevoelig"
                        where={ [
                            Where.Personenauto,
                            Where.M1,
                            Where.GeenTaxi,
                            Where.GeenOldtimer,
                            Where.GeenCamper,
                            `(${ HighRiskOfTheft.map(v => `(${ v })`).join(' OR ') })`,
                        ] }                    
                    >
                        Diefstalgevoelig
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="personenauto-import"
                        where={ [
                            Where.Personenauto,
                            Where.M1,
                            Where.GeenTaxi,
                            Where.GeenOldtimer,
                            Where.GeenCamper,
                            Where.Import,
                        ] }                    
                    >
                        Geimporteerd
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="personenauto-oldtimer"
                        where={ [
                            Where.Personenauto,
                            Where.M1,
                            Where.GeenTaxi,
                            Where.WelOldtimer,
                            Where.GeenCamper,
                        ] }                    
                    >
                        Oldtimer
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="personenauto-kampeerwagen"
                        where={ [
                            Where.Personenauto,
                            Where.M1,
                            Where.GeenTaxi,
                            Where.GeenOldtimer,
                            Where.WelCamper,
                        ] }                    
                    >
                        Kampeerwagen
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="personenauto-taxi"
                        where={ [
                            Where.Personenauto,
                            Where.M1,
                            Where.GeenOldtimer,
                            Where.GeenCamper,
                            Where.WelTaxi,
                        ] }                    
                    >
                        Taxi
                    </QueryOption>
                </Category>

                {/* Bedrijfswagens */}
                <Category>
                    <QueryOption
                        onClick={ handleSelect }
                        id="bedrijfswagens"
                        where={ [
                            Where.Bedrijfsauto,
                            Where.GeenOldtimer,
                            Where.GeenTaxi,  
                        ] }                    
                    >
                        Bedrijfswagens
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="bedrijfswagens-licht"
                        where={ [
                            Where.Bedrijfsauto,
                            Where.GeenOldtimer,
                            Where.GeenTaxi,  
                            Where.N1,
                        ] }                    
                    >
                        Licht
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="bedrijfswagens-middelzwaar"
                        where={ [
                            Where.Bedrijfsauto,
                            Where.GeenOldtimer,
                            Where.GeenTaxi,
                            Where.N2,
                        ] }                    
                    >
                        Middelzwaar
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="bedrijfswagens-zwaar"
                        where={ [
                            Where.Bedrijfsauto,
                            Where.GeenOldtimer,
                            Where.GeenTaxi,
                            Where.N3,
                        ] }                    
                    >
                        Zwaar
                    </QueryOption>                                                
                </Category>

                {/* Brom- en snorfietsen */}
                <Category>
                    <QueryOption
                        onClick={ handleSelect }
                        id="bromsnorfiets"
                        where={ [
                            Where.Bromfiets,
                            Where.GeenOldtimer, 
                            Where.TweeWielen,
                        ] }
                    >
                        Brom- of snorfiets
                    </QueryOption>   
                    <QueryOption
                        onClick={ handleSelect }
                        id="bromsnorfiets-bromfiets"
                        where={ [
                            Where.Bromfiets,
                            Where.GeenOldtimer, 
                            Where.TweeWielen,
                            Where.Max45,
                        ] }                    
                    >
                        Bromfiets
                    </QueryOption>        
                    <QueryOption
                        onClick={ handleSelect }
                        id="bromsnorfiets-snorfiets"
                        where={ [
                            Where.Bromfiets,
                            Where.GeenOldtimer, 
                            Where.TweeWielen,
                            Where.Max25,
                        ] }                    
                    >
                        Snorfiets
                    </QueryOption> 
                    <QueryOption
                        onClick={ handleSelect }
                        id="bromsnorfiets-oldtimer"
                        where={ [
                            Where.Bromfiets,
                            Where.WelOldtimer, 
                            Where.TweeWielen,
                        ] }                    
                    >
                        Oldtimer
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="bromsnorfiets-speed-pedelec"
                        where={ [
                            Where.Bromfiets,
                            Where.L1,
                            Where.GeenOldtimer, 
                            Where.TweeWielen,
                            Where.WelElektrisch,
                            "massa_ledig_voertuig < 30",
                        ] }                    
                    >
                        Speed-Pedelec <span>BETA</span>
                    </QueryOption>               
                </Category>

                {/* Motor */}
                <Category>
                    <QueryOption
                        onClick={ handleSelect }
                        id="motor"
                        where={ [
                            Where.Motorfiets,
                            Where.TweeWielen,
                            Where.TweeWielen,
                        ] }
                    >
                        Motor
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="motor-import"
                        where={ [
                            Where.Motorfiets,
                            Where.TweeWielen,
                            Where.Import,
                        ] }
                    >
                        Geimporteerd
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="motor-oldtimer"
                        where={ [
                            Where.Motorfiets,
                            Where.WelOldtimer,
                        ] }
                    >
                        Oldtimer
                    </QueryOption>
                </Category>

                {/* Aanhangwagen */}
                <Category>
                    <QueryOption
                        onClick={ handleSelect }
                        id="aanhangwagen"
                        where={ [
                            Where.Aanhangwagen,
                        ] }
                    >
                        Aanhangwagen
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="aanhangwagen-caravan"
                        where={ [
                            Where.Aanhangwagen,
                            Where.Caravan,
                        ] }
                    >
                        Caravan
                    </QueryOption>
                    <QueryOption
                        onClick={ handleSelect }
                        id="aanhangwagen-oplegger"
                        where={ [
                            Where.Oplegger,
                        ] }
                    >
                        Oplegger
                    </QueryOption>
                </Category>
            </CategoryWrapper>
        </Wrapper>
    );    
};

Selector.propTypes = {
    onVehicle: PropTypes.func.isRequired,
    onCancel:  PropTypes.func.isRequired,
};

export default Selector;