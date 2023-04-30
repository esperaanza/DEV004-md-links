
// const fs = require('fs');
import MarkdownLinkExtractor from 'markdown-link-extractor';
import fetch from 'node-fetch';

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const extractor = new MarkdownLinkExtractor();
    const results = [];

    extractor.extractFromFile(path, (err, links) => {
      if (err) {
        reject(err);
      } else {
        links.forEach((link) => {
          const { href, text } = link;
          const file = path;
          if (options.validate) {
            fetch(href)
              .then((res) => {
                results.push({
                  href,
                  text,
                  file,
                  status: res.status,
                  ok: res.ok ? 'ok' : 'fail',
                });
                if (results.length === links.length) {
                  resolve(results);
                }
              })
              .catch(() => {
                results.push({
                  href,
                  text,
                  file,
                  status: 'N/A',
                  ok: 'fail',
                });
                if (results.length === links.length) {
                  resolve(results);
                }
              });
          } else {
            results.push({
              href,
              text,
              file,
            });
            if (results.length === links.length) {
              resolve(results);
            }
          }
        });
      }
    });
  });
}

export default mdLinks;
