import speech_recognition as sr
import pyttsx3
import datetime
import webbrowser
import wikipedia
import os

engine = pyttsx3.init()
engine.setProperty('rate', 150)

def speak(text):
    engine.say(text)
    engine.runAndWait()

def listen():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
        try:
            command = recognizer.recognize_google(audio).lower()
            print("You said:", command)
            return command
        except:
            speak("Sorry, I didn't catch that.")
            return ""

def respond(command):
    if "time" in command:
        now = datetime.datetime.now().strftime("%H:%M:%S")
        speak(f"The time is {now}")
    elif "date" in command:
        today = datetime.date.today().strftime("%B %d, %Y")
        speak(f"Today is {today}")
    elif "open youtube" in command:
        webbrowser.open("https://youtube.com")
        speak("Opening YouTube.")
    elif "who is" in command:
        person = command.replace("who is", "")
        try:
            info = wikipedia.summary(person, 1)
            speak(info)
        except:
            speak("Sorry, I couldn't find that.")
    elif "note" in command:
        with open("note.txt", "a") as f:
            f.write(command + "\n")
        speak("Noted.")
    elif "exit" in command or "stop" in command:
        speak("Goodbye!")
        exit()
    else:
        speak("I can't do that yet, but I'm learning!")

def main():
    speak("Hello! I am your Python assistant.")
    while True:
        command = listen()
        respond(command)

if __name__ == "__main__":
    main()
