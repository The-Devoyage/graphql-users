# Changelog

## [v0.3.3]

### Changed

- Remove requirement for GitHub PAT in non-docker builds.

## [v0.3.2]

### Changed

- Model Schema Post Hook Fixed - Changed to `findOneAndUpdate` to catch duplicate key errors when updating documents.
- Invite User - Converted "membership exists" error handler to Apollo Error.

## [v0.3.1]

### Changed 

- Allow membership holders to edit membership details.
- No user found bug fix. 

## [v0.3.0]

### Added
- Support for paywall with `@the-devoyage/graphql-paywall` and the `paywall-helpers` library.
- New Scalars for Validation - `EmailAddress`, `PhoneNumber`, `PostalCode`, `CountryCode`
- Historical Stats Support with Mongo Filter Generator
- Create User Resolver

### Changed
- Federation 2
- Graphql 16
- Updated `DateTime` Scalar
- `Email` property of a `User` is now required.
-  All User Inputs now use `Query` and `Payload` Properties.
- `DeleteUsers` resolver now supports `deleteMany`.
- Global `DeleteResponse` implemented in the `DeleteUsers` resolver.

### Removed


