import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Header';
import {colors} from '../../../../utils';
import NewsItem from '..';
import {DummyNews4} from '../../../../assets';
import {Gap} from '../../../atoms';
import axios from 'axios';

export default function NewsAll({navigation}) {
  const [news, setnews] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    await axios
      .get('http://192.168.43.123:8000/api/allnews', {})
      .then(result => {
        // console.log(result.data.data);
        setnews(result.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.page}>
      <Header title="All News" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <ScrollView style={styles.content}>
        {news == null ? (
          <ActivityIndicator />
        ) : (
          news.map(news => {
            return (
              <TouchableOpacity
                key={news.id}
                onPress={() => {
                  navigation.navigate('NewsDetail', {
                    data: news,
                  });
                }}>
                <NewsItem name={news.title} image={DummyNews4} />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14,
    paddingLeft: 15,
    paddingRight: 15,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
