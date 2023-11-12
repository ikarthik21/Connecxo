import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    VIDEO_CALL: false,
    AUDIO_CALL: false,
    END_CALL: false,
    INCOMING_VIDEO_CALL: {
        user: {},
        visible: false
    },
    INCOMING_AUDIO_CALL: {
        user: {},
        visible: false
    }
}

export const callSlice = createSlice({
    name: "calls",
    initialState: initialState,
    reducers: {
        callState(state, action) {
            return state = action.payload;
        },
        initVideo(state) {
            return state = { ...initialState, VIDEO_CALL: true }
        },
        initAudio(state) {
            return state = { ...initialState, AUDIO_CALL: true }
        },
        endCall(state) {
            return state = {
                ...initialState, INCOMING_VIDEO_CALL: {
                    user: {},
                    visible: false
                },
                INCOMING_AUDIO_CALL: {
                    user: {},
                    visible: false
                }
            }
        },
        incomingCall(state, action) {

            if (action.payload.type === "audio") {
                return state = {
                    ...state, INCOMING_AUDIO_CALL: {
                        user: action.payload,
                        visible: true
                    }
                }
            }
            else {
                return state = {
                    ...state, INCOMING_VIDEO_CALL: {
                        user: action.payload,
                        visible: true
                    }
                }
            }
        },
        
        closeIncoming(state) {
            return state = {
                ...state, INCOMING_VIDEO_CALL: {
                    user: {},
                    visible: false
                },
                INCOMING_AUDIO_CALL: {
                    user: {},
                    visible: false
                }
            }
        }
    }
});

export const { callState, initVideo, initAudio, endCall, closeIncoming, incomingCall } = callSlice.actions;

