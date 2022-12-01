# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.17.6]
### Fixed: juniper cancellation policy not inconsistency
- Juniper: increase api version 2.2 to 2.4
## [2.17.5]
### Added
- EPS: increase api version 2.2 to 2.4

## [2.17.4]
### Fixed
- TBO: increase chunk size to 50
- Agoda: change http to https

## [2.17.3]
### Fixed
- Infinite: fix hotel wrong transformResponse

## [2.17.2]
### Fixed
- Infinite re-index room

## [2.17.1]
### Fixed
- Infinite wrong idx and room_type_id

## [2.17.0] - 2020-03-09
### Released
- RateHawk
### Fixed
- NTA wrong price if room has children
- Board basis for tech house
- FIT cancellations leakage

## [2.16.0] - 2020-02-24
### Changed
- Region search workflow
- Add Jalan room size
### Fixed
- NTA search by id

## [2.15.0] - 2020-02-06
### Changed
- Re-structure project
- Get DerbySoft chains hotel ids from database

## [2.14.0] - 2020-02-04
### Released
- Rotana

## [2.13.0] - 2019-12-23
### Added
- CUG flag to API credentials
- region-mapping API
### Changed
- EPS: send `closer_user_group`, `sales_environment` to supplier
- Jalan: remove some remarks (NTA dont want to see)
- Set markup per supplier_id instead of supplier_code
### Fixed
- NTA: number of children

## [2.11.0] - 2019-10-28
### Released
- MG v4 Jarvis
### Changed
- Filter account's supplier by rate type
### Fixed
- NTA cancellations for peak season

## [2.10.1] - 2019-10-11
### Added
- NTA meal code
### Fixed
- Logging payload
- Region with multiple mapping to a supplier
- Revised NTA cancellation rules

## [2.10.0] - 2019-10-03
### Changed
- Innstant connect via XTG
- Logging

## [2.9.3] - 2019-09-26
### Changed
- DerbySoft v3.1
- FIT b2c flag

## [2.9.2] - 2019-09-18
### Changed
- NTA use new method (gFCheckBookingNew) for prebook
- Allow CORS

## [2.9.1] - 2019-07-03
### Added
- Add more logs

### Fixed
- search-by-id API
- Traveloka currency

## [2.9.0] - 2019-07-03
### Changed
- source_id based on contract

### Added
- Taxes and fees breakdown
- Remarks at prebooking
- More logs for search/getrooms apis
- Gitlab CI

### Fixed
- Innstant polling data
- TravelgateX logger
- Getaroom value adds

## [2.8.2] - 2019-05-13
### Changed
- NTA cancellation rules

### Fixed
- Getaroom get hotel ids
- NTA search limit
- HMS send unique id to get mapping id

## [2.8.1] - 2019-04-22
### Fixed
- EAN returning no Gross profile online
- Increased the chunk size, wait time to reduce Zumata call

## [2.8.0] - 2019-04-05
### Added
- Currency convertion
- Datadogs log metrics
- A lot of things for dashboard

### Fixed
- FIT, Quantum, XTG cancellations
- APItude rateKey changed format

### Removed
- Old hotel mapping API

## [2.7.0] - 2019-02-22
### Added
- Getaroom
- More support for dashboard

## [2.6.2] - 2019-01-17
### Added
- Expedia commissionable rate logic

## [2.6.1] - 2018-12-25
### Added
- Room type, bed type information

### Changed
- NTA search by prefecture

## [2.6.0] - 2018-12-06
### Released
- TBO Holidays

### Changed
- Handling old destination codes which has 4 char

## [2.5.1] - 2018-11-27
### Changed
- Zumata: update room rate

## [2.5.0] - 2018-11-24
### Added
- New method, support search by region
- Search with rooms flag
- New supplier: Innstant, MG v4

### Changed
- Zumata get hotel ids by region instead of geo

## [2.3.2] - 2018-11-09
### Fixed
- Multiple rooms search disabled

## [2.3.1] - 2018-11-08
### Fixed
- Convert currency for promos

## [2.3.0] - 2018-11-06
### Released
- Zumata
- Traveloka

### Fixed
- EAN cancellation rules
- GTA booking with infant

## [2.2.6] - 2018-10-25
### Added
- Whitelisting hotel for a destination

## [2.2.5] - 2018-10-01
### Changed
- Apply markup for cancellations
- Use `checkin` for last cancellation rule which missing `to` date instead of `checkout`

### Fixed
- `getrooms` use goquo_id

## [2.2.4] - 2018-08-26
### Added
- City taxes and fees

### Fixed
- Dida: filtering hotel outside country
- EAN: correct endpoint

## [2.2.3] - 2018-08-23
### Added
- Remove user supplier

### Fixed
- Hotel mapping change API url

## [2.2.2] - 2018-08-21
### Fixed
- Limited fetch mappings from old hotel mapping

## [2.2.1] - 2018-08-17
### Fixed
- Must use same user_id and request_id

## [2.2.0] - 2018-08-13
### Changed
- User permissions to User roles

## [2.1.3] - 2018-08-12
### Fixed
- Convert currency in case missing cancelltions

## [2.1.2] - 2018-08-06
### Added
- HMS mapping code

## [2.1.1] - 2018-07-31
### Fixed
- Handle hotel mapping return empty data

## [2.1.0] - 2018-07-30
### Added
- User permissions

### Changed
- Improve search: Dida, MRSP
- RoomsXML: limit max 2 pax each search

## [2.0.1] - 2018-07-13
### Changed
- Convert currency even search, cancellations

## [2.0.0] - 2018-07-12
### Added
- New suppliers: MRSP, Darina, Dida (unstable)
- Hotel mapping inside gateway
- Support APIs for dashboard
- Booking flow working with goquo_id
- Retrieve booking details

### Changed
- Change Travflex, TravelGate to correct supplier code

### Fixed
- Quantum search by id
- DOTW cancel restricted
