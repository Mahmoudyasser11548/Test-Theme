import {isObjEmpty, kFormatter, isToday, htmlToString} from './Utils'

test('testing is object empty metho should return false', () => {
  expect(isObjEmpty({"test":"moahmed"})).toBe(false)
})

test('testing is object empty method should return true when pass empty object', () => {
  expect(isObjEmpty({})).toBe(true)
})

test('testing is object empty method should return true when pass null', () => {
  expect(isObjEmpty(null)).toBe(true)
})

test('testing is format greater than 999', () => {
  expect(kFormatter(1000)).toBe('1.0k')
})

test('Mocking: testing is format greater than 999', () => {
  const kFormatterMock = jest.fn()
  kFormatterMock.mockReturnValue('1.0k')
  expect(kFormatter(1000)).toBe(kFormatterMock())
  kFormatterMock.mockReturnValue('2.0k')
  expect(kFormatter(2000)).toBe(kFormatterMock())
  expect(kFormatterMock).toHaveBeenCalledTimes(2)
})

test('testing is format less than 999', () => {
  expect(kFormatter(800)).toBe(800)
})

test('Check Today is Today', () => {
  const today = new Date()
  expect(isToday(today)).toBe(true)
})

test('Converts HTML to string', () => {
  expect(htmlToString('<html></html>abbbb')).toBe("abbbb")
})

