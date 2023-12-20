from bardapi import Bard
import streamlit as st
from streamlit_chat import message


def response_api(prompt):
    message=Bard().get_answer(str(message))['content']
    return message