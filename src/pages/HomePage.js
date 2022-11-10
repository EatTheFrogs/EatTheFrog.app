import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KermitGoals from '../images/KermitGoals.png';
import KermitEvents from '../images/KermitEvents.png';
import CreateGoal from '../images/CreateGoal.png';
import CreateGoalSmall from '../images/CreateGoalSmall.png';
import ModifyGoal from '../images/ModifyGoal.png';
import ModifyGoalSmall from '../images/ModifyGoalSmall.png';
import LogEvent from '../images/LogEvent.png';
import { FrogJumpSequence } from '../components/loading/FrogJumpSequence.js'
import { AppContext } from '../components/routing/SecureRoutes';
import { Loading } from '../components/loading/Loading';
import '../styles/Global.css';
import '../styles/HomePage.css';

export const HomePage = () => {
    const navigate = useNavigate();
    const { user, isLoading, setIsLoading, setScrollable, setNavHovered } = useContext(AppContext);

    useEffect(() => {
        setScrollable(true);
        window.scrollTo(0, 0);
        setNavHovered(false);
    }, []);

    useEffect(() => {
        if(user != null) {
            setIsLoading(false);
        }
    }, [user]);

    return (
        isLoading ?
        (
            <Loading />
        )
        :
        (
            <div className="page" id="home-container">
                <div className="flex-column-top page-header frog-background" id="home-header">
                    <div className="flex-row" id="home-header-content">
                        <FrogJumpSequence intervalTime={800}/>
                    </div>
                    <div id="quote-container">
                        <h2 className="quote">"If it's your job to eat a frog, it's best to do it first thing in the morning...</h2>
                        <h2 className="quote">And If it's your job to eat two frogs, it's best to eat the biggest one first."</h2>
                        <h2 className="quote">- Mark Twain</h2>
                    </div>
                </div>
                <div id="home-goals-events-container">
                        <div className="flex-row" id="home-goals-events-row">
                            <div className="goals-events-info-button flex-row" onClick={() => navigate('/goals')}>
                                <img className='kermit-png' src={KermitGoals} alt="Kermit the Frog thinking."/>
                                <div className="goals-events-info-button-words">
                                    <h1 className="goals-events-info-title">Manage Goals</h1>
                                    <h3 className="goals-events-info-description">Add new goals and set up event templates</h3>
                                </div>
                            </div>
                            <div className="goals-events-info-button flex-row" onClick={() => navigate('/events')}>
                            <img className='kermit-png' src={KermitEvents} alt="Kermit the Frog giving thumbs up."/>
                                <div className="goals-events-info-button-words">
                                    <h1 className="goals-events-info-title">Add Progress Event</h1>
                                    <h3 className="goals-events-info-description">Log completed events to track your progress</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="home-main-container">
                    <div className="home-info-container" id="home-create-goal">
                        <div className="home-info-header">
                            <h1 className="home-info-header-name">Create Goals</h1>
                            <p className="home-info-header-description">Making leaps towards any life goals? Signup with Eat The Frog and start tracking your progress for free!</p>
                        </div>
                        <div className="home-info row-reverse">
                            <div className="home-main-step">
                                <img className='home-step-png' id="home-create-goal-png" src={CreateGoal} alt="Create Goal view from 'Manage Goals' page."/>
                            </div>
                            <div className="home-main-step-mobile">
                                <img className='home-step-png' id="home-create-goal-png" src={CreateGoalSmall} alt="Create Goal view from 'Manage Goals' page."/>
                            </div>
                            <div className="home-info-text-container">
                                <p className="home-info-text-description">Eat The Frog works for goals of any type:</p>
                                <div className="home-info-text-tags">
                                    <div className="home-info-text-tags indent">
                                        <p className="home-info-text-tag">- Health & Fitness</p>
                                        <p className="home-info-text-tag">- Career-Oriented</p>
                                        <p className="home-info-text-tag">- Financial</p>
                                        <p className="home-info-text-tag">- Interpersonal</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-info-container" id="home-modify-goal">
                        <div className="home-info-header">
                            <h1 className="home-info-header-name">Add Event Templates</h1>
                            <p className="home-info-header-description">Create reusable event templates for each goal to make the process of logging completed events effortless. Utilize our specialized template types to make life even easier!</p>
                        </div>
                        <div className="home-info space-between">
                            <div className="home-main-step">
                                <img className='home-step-png' id="home-modify-goal-png" src={ModifyGoal} alt="Modify Goal view from 'Manage Goals' page."/>
                            </div>
                            <div className="home-main-step-mobile">
                                <img className='home-step-png' id="home-modify-goal-png" src={ModifyGoalSmall} alt="Modify Goal view from 'Manage Goals' page."/>
                            </div>
                            <div className="home-info-text-container">
                                <p className="home-info-text-description">Template Types</p>
                                <div className="home-info-text-tags">
                                    <div className="home-info-text-tags">
                                        <p className="home-info-text-tag"><b>Default: </b> Basic template that can be used for any type of goal</p>
                                        <p className="home-info-text-tag"><b>Lift: </b> Custom template made specifically for recording lifting sessions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-info-container" id="home-eat-the-frog">
                        <div className="home-info">
                            <div className="home-info-text-container-etf">
                                <h1 className="home-info-text-header-etf">EAT THE FROG!</h1>
                                <p className="home-info-text-sub-header-etf">This is without a doubt the single most important step... But what exactly does it mean?</p>
                                <p className="home-info-text-description-etf">'Eat the frog' is a philosophy centered around achieving one's goals in an efficient manner. To eat the frog is to take a task that you know should be completed and simply get it done, without procrastination, no matter how difficult or unpleasant the task may be. The term originated from the Mark Twain quote shown above and was furthur popularized by Brian Tracy's book <i>Eat That Frog!</i> which expands upon the wisdom taken from Twain's proverb.</p>    
                            </div>
                        </div>
                    </div>
                    <div className="home-info-container" id="home-log-event">
                        <div className="home-info-header">
                            <h1 className="home-info-header-name">Log Events</h1>
                            <p className="home-info-header-description">You did the hardest part and ate the frog- Now it's time to log an event to keep track of your progress!</p>
                        </div>
                        <div className="home-info row-reverse">
                            <div className="home-main-step">
                                <img className='home-step-png' id="home-log-event-png" src={LogEvent} alt="Modify Goal view from 'Manage Goals' page."/>
                            </div>
                            <div className="home-main-step-mobile">
                                <img className='home-step-png' id="home-log-event-png" src={LogEvent} alt="Modify Goal view from 'Manage Goals' page."/>
                            </div>
                            <div className="home-info-text-container home-info-text-container-wide">
                                <p className="home-info-text-description">The 'Event Log' allows users to:</p>
                                <div className="home-info-text-tags">
                                    <div className="home-info-text-tags" id="log-events-text-tags">
                                        <p className="home-info-text-tag">- Seamlessly log completed events using previously created templates</p>
                                        <p className="home-info-text-tag">- Dynamically add / delete fields to / from templates</p>
                                        <p className="home-info-text-tag">- Track lifting workouts in live time when using a lift template type</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="home-footer-container">

                </div>
            </div>
        )
    )
}