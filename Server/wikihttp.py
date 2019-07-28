from __future__ import print_function
from flask import Flask , jsonify, request
from flask_cors import CORS
import os
import psutil
import json
import datetime
import nltk
import bs4 as bs 
import urllib
import regex as re
from six.moves.urllib.request import urlopen

def sum(content):
    ##scraped_data = urllib.request.urlopen('https://en.wikipedia.org/wiki/Artificial_intelligence')  
    ##scraped_data = urlopen('https://en.wikipedia.org/wiki/Object-oriented_programming')
    scraped_data = urlopen("%s" %content)
    article = scraped_data.read()
    ##article = content
    parsed_article = bs.BeautifulSoup(article,'lxml')

    paragraphs = parsed_article.find_all('p')

    article_text = ""

    for p in paragraphs:  
        article_text += p.text

    # Removing Square Brackets and Extra Spaces
    article_text = re.sub(r'\[[0-9]*\]', ' ', article_text)  
    article_text = re.sub(r'\s+', ' ', article_text)

    # Removing special characters and digits
    formatted_article_text = re.sub('[^a-zA-Z]', ' ', article_text )  
    formatted_article_text = re.sub(r'\s+', ' ', formatted_article_text)  

    sentence_list = nltk.sent_tokenize(article_text)

    stopwords = nltk.corpus.stopwords.words('english')

    word_frequencies = {}  
    for word in nltk.word_tokenize(formatted_article_text):  
        if word not in stopwords:
            if word not in word_frequencies.keys():
                word_frequencies[word] = 1
            else:
                word_frequencies[word] += 1

    maximum_frequncy = max(word_frequencies.values())
    for word in word_frequencies.keys():  
        word_frequencies[word] = (word_frequencies[word]/maximum_frequncy)



    sentence_scores = {}  
    for sent in sentence_list:  
        for word in nltk.word_tokenize(sent.lower()):
            if word in word_frequencies.keys():
                if len(sent.split(' ')) < 30:
                    if sent not in sentence_scores.keys():
                        sentence_scores[sent] = word_frequencies[word]
                    else:
                        sentence_scores[sent] += word_frequencies[word]


    import heapq  
    summary_sentences = heapq.nlargest(7, sentence_scores, key=sentence_scores.get)

    summary = ' '.join(summary_sentences)  
    return summary

##server --------------------------------------------------------------
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
pid = os.getpid()
py = psutil.Process(pid)

@app.route('/api/v2/wiki', methods=['POST'])
def get_tasks():
    content = request.json
    url = content['url']
    if url!='':
        sums = sum(url)
        data = jsonify(
            link = url,
            summary = sums
            )
    else:
        data  = jsonify()
    return data

if __name__ == '__main__':
    app.run(debug=True)