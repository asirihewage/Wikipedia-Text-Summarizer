# Wikipedia-Text-Summarizer
Automatic text summarization tool written in python.

 ![screenshot](https://github.com/asirihewage/Wikipedia-Text-Summarizer/blob/master/nlp%20sum%20impl.png) 

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install nltk.
```bash
pip install nltk
```

## Import

import [nltk](https://www.nltk.org/install.html)

import bs4 as bs  

import [urllib.request](https://github.com/python/cpython/blob/3.7/Lib/urllib/request.py)

import re

import heapq 


## Usage

```python
scraped_data = urllib.request.urlopen('https://en.wikipedia.org/wiki/Object-oriented_programming')  
article = scraped_data.read()

parsed_article = bs.BeautifulSoup(article,'lxml')

paragraphs = parsed_article.find_all('p')
```

```python
# Removing Square Brackets and Extra Spaces
article_text = re.sub(r'\[[0-9]*\]', ' ', article_text)  
article_text = re.sub(r'\s+', ' ', article_text)
```


```python
# Removing special characters and digits
formatted_article_text = re.sub('[^a-zA-Z]', ' ', article_text )  
formatted_article_text = re.sub(r'\s+', ' ', formatted_article_text)  
```


```python
word_frequencies = {}  
for word in nltk.word_tokenize(formatted_article_text):  
    if word not in stopwords:
        if word not in word_frequencies.keys():
            word_frequencies[word] = 1
        else:
            word_frequencies[word] += 1
```

```python
sentence_scores = {}  
for sent in sentence_list:  
    for word in nltk.word_tokenize(sent.lower()):
        if word in word_frequencies.keys():
            if len(sent.split(' ')) < 30:
                if sent not in sentence_scores.keys():
                    sentence_scores[sent] = word_frequencies[word]
                else:
                    sentence_scores[sent] += word_frequencies[word]
```

```python
maximum_frequncy = max(word_frequencies.values())
for word in word_frequencies.keys():  
    word_frequencies[word] = (word_frequencies[word]/maximum_frequncy)
```

```python
summary_sentences = heapq.nlargest(7, sentence_scores, key=sentence_scores.get)
summary = ' '.join(summary_sentences)  
print(summary)  
```
## Deployment
You can deploy this project on Google App Engine by creating a simple debain VM instance. After installing all dependancies using pip you can clone this project and run it. Don't forget to use Use pip3 and python3. 
Ex: 
```python
pip3 install nltk
python3 wikipy.py
````

## Contributing
The project is done by Asiri (SLIIT UG 3yr) according to the idea given by Ms.Sachindi (SLIIT UN 4yr)
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
