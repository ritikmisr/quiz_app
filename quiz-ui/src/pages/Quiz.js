import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuestions, markTestAsGiven } from '../actions/questionAction';
import Button from '../components/Button';
import Card from "../components/Card";
import RadioButton from "../components/RadioButton";
import cameraRef from '../HigherOrderComponent/cameraRef';
import './Quiz.css'

const Quiz = ({ videoRef }) => {
    const [count, setCount] = useState(0);
    const [userResponse, setuserResponse] = useState('');
    const [error, setError] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const questions = useSelector((state) => state.question);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestionDetails = async () => {
            try {
                await dispatch(fetchQuestions());
            }
            catch (e) {
                setError(true);
            }
        };
        fetchQuestionDetails();
    }, []);



    useEffect(() => {
        const getCameraStream = async () => {
            try {
                const videoStream = await navigator.mediaDevices.getUserMedia({
                    video: true, audio: true
                });

                if (videoRef?.current) {
                    videoRef.current.srcObject = videoStream;
                    setError(false);

                    videoStream.getTracks().forEach(track => {
                        track.onended = () => {
                            setError(true);
                            handleSubmit();
                            alert('Camera access has been revoked.');
                        };
                    });
                }
            } catch (err) {
                setError(true);
            }
        };

        getCameraStream();

        return () => {
            if (videoRef?.current && videoRef?.current?.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const handleNextQuestion = () => {
        setCount(count + 1);
    }

    const handlePreviousQuestion = () => {
        setCount(count - 1);
    }

    const handleSubmit = async () => {
        try {
            await dispatch(markTestAsGiven());
        }
        catch (e) {

        }
        navigate('/test-completed');
    }

    if (questions.error) {
        navigate('/get-camer-access');
    }

    const { questionDetails } = questions;

    return (
        <Card className={'card center-aligned card-increased-padding'}>
            {
                questionDetails && questionDetails?.length > 0 && !error && !questions.error && (
                    <div className="question-option-container">
                        <div className="question">{questionDetails[count].question}</div>
                        <div className="option-container">
                            {questionDetails[count].options.map((option, idx) => {
                                return (<div className="radio-button"><RadioButton
                                    key={idx.toString()}
                                    className={'radio radio-margin-right-10'}
                                    option={option}
                                    value={selectedValue}
                                    handleChange={(e) => setSelectedValue(e.target.value)}
                                /></div>)
                            })}
                        </div>


                        <div className='button-container'>
                            {count >= 1 && (
                                <Button
                                    className={'btn btn-primary'}
                                    label={'Back'}
                                    handleClick={handlePreviousQuestion}
                                />
                            )}
                            {count === questionDetails.length - 1 ? (
                                <Button
                                    className={'btn'}
                                    label={'Submit'}
                                    handleClick={handleSubmit}
                                />
                            ) : (
                                <Button
                                    className={'btn'}
                                    label={'Next'}
                                    handleClick={handleNextQuestion}
                                />
                            )}

                        </div>
                    </div>
                )
            }
            {
                ((questionDetails && questionDetails?.length === 0 && questionDetails.error) || error) && (
                    <div className="question-fetch-error">Something went wrong!</div>

                )
            }

        </Card>
    )
}

export default cameraRef(Quiz);