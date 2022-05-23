import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A country code as defined by ISO 3166-1 alpha-2 */
  CountryCode: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: any;
  _Any: any;
  federation__FieldSet: any;
  link__Import: any;
};

export type Account = {
  __typename?: 'Account';
  _id: Scalars['ObjectID'];
  email: Scalars['EmailAddress'];
  users: GetUsersResponse;
};


export type AccountUsersArgs = {
  getUsersInput: GetUsersInput;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  country: Scalars['CountryCode'];
  lineOne: Scalars['String'];
  lineTwo?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  zip: Scalars['PostalCode'];
};

export type AddressInput = {
  city: Scalars['String'];
  country: Scalars['CountryCode'];
  lineOne: Scalars['String'];
  lineTwo?: InputMaybe<Scalars['String']>;
  state: Scalars['String'];
  zip: Scalars['PostalCode'];
};

export enum ArrayFilterByEnum {
  In = 'IN',
  Nin = 'NIN'
}

/** Filter for documents which have a property that is a Boolean. */
export type BooleanFieldFilter = {
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

/** Equal or Not Equal */
export enum BooleanFilterByEnum {
  Eq = 'EQ',
  Ne = 'NE'
}

export type CreateUserInput = {
  payload: UserInput;
};

/** Filter for documents which have a property that is a Date. */
export type DateFieldFilter = {
  date: Scalars['DateTime'];
  filterBy: DateFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

export enum DateFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

export type DeleteUsersInput = {
  query: UserFieldFiltersInput;
};

export type DeleteUsersResponse = {
  __typename?: 'DeleteUsersResponse';
  deletedCount: Scalars['Int'];
};

/** Global configuration details. */
export type FilterConfig = {
  history?: InputMaybe<HistoryFilterInput>;
  pagination?: InputMaybe<Pagination>;
};

export type GetUserByMembershipFilterInput = {
  _id?: InputMaybe<StringFieldFilter>;
  account?: InputMaybe<StringFieldFilter>;
  createdAt?: InputMaybe<DateFieldFilter>;
  default?: InputMaybe<BooleanFieldFilter>;
  role?: InputMaybe<Array<InputMaybe<IntFieldFilter>>>;
  status?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<DateFieldFilter>;
};

export type GetUsersInput = {
  config?: InputMaybe<FilterConfig>;
  query: UserFieldFiltersInput;
};

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  data: Array<User>;
  stats: Stats;
};

export type HistoricStats = {
  __typename?: 'HistoricStats';
  _id?: Maybe<HistoricStatsId>;
  total?: Maybe<Scalars['Int']>;
};

export type HistoricStatsId = {
  __typename?: 'HistoricStatsId';
  DAY_OF_MONTH?: Maybe<Scalars['Int']>;
  DAY_OF_WEEK?: Maybe<Scalars['Int']>;
  DAY_OF_YEAR?: Maybe<Scalars['Int']>;
  HOUR?: Maybe<Scalars['Int']>;
  MILLISECONDS?: Maybe<Scalars['Int']>;
  MINUTES?: Maybe<Scalars['Int']>;
  MONTH?: Maybe<Scalars['Int']>;
  SECONDS?: Maybe<Scalars['Int']>;
  WEEK?: Maybe<Scalars['Int']>;
  YEAR?: Maybe<Scalars['Int']>;
};

export type HistoryFilterInput = {
  interval: Array<HistoryFilterIntervalEnum>;
};

export enum HistoryFilterIntervalEnum {
  DayOfMonth = 'DAY_OF_MONTH',
  DayOfWeek = 'DAY_OF_WEEK',
  DayOfYear = 'DAY_OF_YEAR',
  Hour = 'HOUR',
  Milliseconds = 'MILLISECONDS',
  Minutes = 'MINUTES',
  Month = 'MONTH',
  Seconds = 'SECONDS',
  Week = 'WEEK',
  Year = 'YEAR'
}

/** Filter for documents which have a property that is an Integer. */
export type IntFieldFilter = {
  filterBy: IntFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  int: Scalars['Int'];
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

export enum IntFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

export type InviteUserInput = {
  payload: UserInput;
  query: UserFieldFiltersInput;
};

export type LocalMembershipInput = {
  about?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<AddressInput>;
  first_name?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['ObjectID']>;
  last_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['PhoneNumber']>;
};

export type LocalUserDetails = {
  __typename?: 'LocalUserDetails';
  about?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
  first_name?: Maybe<Scalars['String']>;
  image?: Maybe<Media>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['PhoneNumber']>;
};

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse';
  token: Scalars['String'];
  user: User;
};

export type Media = {
  __typename?: 'Media';
  _id: Scalars['ObjectID'];
};

export type Membership = {
  __typename?: 'Membership';
  _id: Scalars['ObjectID'];
  account: Account;
  createdAt: Scalars['DateTime'];
  created_by: User;
  default: Scalars['Boolean'];
  local?: Maybe<LocalUserDetails>;
  role: Scalars['Int'];
  status?: Maybe<MembershipStatusEnum>;
  updatedAt: Scalars['DateTime'];
};

export type MembershipInput = {
  account: Scalars['ObjectID'];
  default?: InputMaybe<Scalars['Boolean']>;
  local?: InputMaybe<LocalMembershipInput>;
  role?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<MembershipStatusEnum>;
};

export enum MembershipStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  Revoked = 'REVOKED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUsers: DeleteUsersResponse;
  inviteUser: User;
  loginUser: LoginUserResponse;
  switchUserMembership: LoginUserResponse;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteUsersArgs = {
  deleteUsersInput: DeleteUsersInput;
};


export type MutationInviteUserArgs = {
  inviteUserInput: InviteUserInput;
};


export type MutationSwitchUserMembershipArgs = {
  switchUserMembershipInput: SwitchUserMembershipInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export enum OperatorFieldConfigEnum {
  And = 'AND',
  Or = 'OR'
}

export type Pagination = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  reverse?: InputMaybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getUsers: GetUsersResponse;
  me: User;
};


export type QueryGetUsersArgs = {
  getUsersInput: GetUsersInput;
};

export type Stats = {
  __typename?: 'Stats';
  cursor?: Maybe<Scalars['DateTime']>;
  history?: Maybe<Array<HistoricStats>>;
  page?: Maybe<Scalars['Int']>;
  remaining?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

/** Filter for documents which have a property that is an array of strings.. */
export type StringArrayFieldFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: StringFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  string: Array<Scalars['String']>;
};

/** Filter for documents which have a property that is a string. Filter by REGEX, ObjectID, or Match. */
export type StringFieldFilter = {
  filterBy: StringFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  string: Scalars['String'];
};

export enum StringFilterByEnum {
  Match = 'MATCH',
  Objectid = 'OBJECTID',
  Regex = 'REGEX'
}

export type SwitchUserMembershipInput = {
  membership_id: Scalars['ObjectID'];
};

export type UpdateUserInput = {
  payload: UserInput;
  query: UserFieldFiltersInput;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectID'];
  about?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
  createdAt: Scalars['DateTime'];
  created_by?: Maybe<User>;
  email: Scalars['EmailAddress'];
  first_name?: Maybe<Scalars['String']>;
  image?: Maybe<Media>;
  last_name?: Maybe<Scalars['String']>;
  memberships: Array<Membership>;
  phone?: Maybe<Scalars['PhoneNumber']>;
  updatedAt: Scalars['DateTime'];
};

export type UserFieldFiltersInput = {
  _id?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  createdAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
  created_by?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  email?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  first_name?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  image?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  last_name?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  memberships?: InputMaybe<Array<InputMaybe<GetUserByMembershipFilterInput>>>;
  phone?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
};

export type UserInput = {
  about?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<AddressInput>;
  email?: InputMaybe<Scalars['EmailAddress']>;
  first_name?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['ObjectID']>;
  last_name?: InputMaybe<Scalars['String']>;
  memberships?: InputMaybe<MembershipInput>;
  phone?: InputMaybe<Scalars['PhoneNumber']>;
};

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  ArrayFilterByEnum: ArrayFilterByEnum;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BooleanFieldFilter: BooleanFieldFilter;
  BooleanFilterByEnum: BooleanFilterByEnum;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']>;
  CreateUserInput: CreateUserInput;
  DateFieldFilter: DateFieldFilter;
  DateFilterByEnum: DateFilterByEnum;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteUsersInput: DeleteUsersInput;
  DeleteUsersResponse: ResolverTypeWrapper<DeleteUsersResponse>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  FilterConfig: FilterConfig;
  GetUserByMembershipFilterInput: GetUserByMembershipFilterInput;
  GetUsersInput: GetUsersInput;
  GetUsersResponse: ResolverTypeWrapper<GetUsersResponse>;
  HistoricStats: ResolverTypeWrapper<HistoricStats>;
  HistoricStatsId: ResolverTypeWrapper<HistoricStatsId>;
  HistoryFilterInput: HistoryFilterInput;
  HistoryFilterIntervalEnum: HistoryFilterIntervalEnum;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntFieldFilter: IntFieldFilter;
  IntFilterByEnum: IntFilterByEnum;
  InviteUserInput: InviteUserInput;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  LocalMembershipInput: LocalMembershipInput;
  LocalUserDetails: ResolverTypeWrapper<LocalUserDetails>;
  LoginUserResponse: ResolverTypeWrapper<LoginUserResponse>;
  Media: ResolverTypeWrapper<Media>;
  Membership: ResolverTypeWrapper<Membership>;
  MembershipInput: MembershipInput;
  MembershipStatusEnum: MembershipStatusEnum;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  OperatorFieldConfigEnum: OperatorFieldConfigEnum;
  Pagination: Pagination;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringArrayFieldFilter: StringArrayFieldFilter;
  StringFieldFilter: StringFieldFilter;
  StringFilterByEnum: StringFilterByEnum;
  SwitchUserMembershipInput: SwitchUserMembershipInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserFieldFiltersInput: UserFieldFiltersInput;
  UserInput: UserInput;
  _Any: ResolverTypeWrapper<Scalars['_Any']>;
  _Entity: ResolversTypes['Account'] | ResolversTypes['Media'] | ResolversTypes['User'];
  _Service: ResolverTypeWrapper<_Service>;
  federation__FieldSet: ResolverTypeWrapper<Scalars['federation__FieldSet']>;
  link__Import: ResolverTypeWrapper<Scalars['link__Import']>;
  link__Purpose: Link__Purpose;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  Address: Address;
  AddressInput: AddressInput;
  Boolean: Scalars['Boolean'];
  BooleanFieldFilter: BooleanFieldFilter;
  CountryCode: Scalars['CountryCode'];
  CreateUserInput: CreateUserInput;
  DateFieldFilter: DateFieldFilter;
  DateTime: Scalars['DateTime'];
  DeleteUsersInput: DeleteUsersInput;
  DeleteUsersResponse: DeleteUsersResponse;
  EmailAddress: Scalars['EmailAddress'];
  FilterConfig: FilterConfig;
  GetUserByMembershipFilterInput: GetUserByMembershipFilterInput;
  GetUsersInput: GetUsersInput;
  GetUsersResponse: GetUsersResponse;
  HistoricStats: HistoricStats;
  HistoricStatsId: HistoricStatsId;
  HistoryFilterInput: HistoryFilterInput;
  Int: Scalars['Int'];
  IntFieldFilter: IntFieldFilter;
  InviteUserInput: InviteUserInput;
  JWT: Scalars['JWT'];
  LocalMembershipInput: LocalMembershipInput;
  LocalUserDetails: LocalUserDetails;
  LoginUserResponse: LoginUserResponse;
  Media: Media;
  Membership: Membership;
  MembershipInput: MembershipInput;
  Mutation: {};
  ObjectID: Scalars['ObjectID'];
  Pagination: Pagination;
  PhoneNumber: Scalars['PhoneNumber'];
  PostalCode: Scalars['PostalCode'];
  Query: {};
  Stats: Stats;
  String: Scalars['String'];
  StringArrayFieldFilter: StringArrayFieldFilter;
  StringFieldFilter: StringFieldFilter;
  SwitchUserMembershipInput: SwitchUserMembershipInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserFieldFiltersInput: UserFieldFiltersInput;
  UserInput: UserInput;
  _Any: Scalars['_Any'];
  _Entity: ResolversParentTypes['Account'] | ResolversParentTypes['Media'] | ResolversParentTypes['User'];
  _Service: _Service;
  federation__FieldSet: Scalars['federation__FieldSet'];
  link__Import: Scalars['link__Import'];
}>;

export type Federation__ExtendsDirectiveArgs = { };

export type Federation__ExtendsDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Federation__InaccessibleDirectiveArgs = { };

export type Federation__InaccessibleDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__InaccessibleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Federation__OverrideDirectiveArgs = {
  from: Scalars['String'];
};

export type Federation__OverrideDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__OverrideDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Federation__ProvidesDirectiveArgs = {
  fields: Scalars['federation__FieldSet'];
};

export type Federation__ProvidesDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__ProvidesDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Federation__TagDirectiveArgs = {
  name: Scalars['String'];
};

export type Federation__TagDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__TagDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  as?: Maybe<Scalars['String']>;
  for?: Maybe<Link__Purpose>;
  import?: Maybe<Array<Maybe<Scalars['link__Import']>>>;
  url?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = Context, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ShareableDirectiveArgs = { };

export type ShareableDirectiveResolver<Result, Parent, ContextType = Context, Args = ShareableDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  users?: Resolver<ResolversTypes['GetUsersResponse'], ParentType, ContextType, RequireFields<AccountUsersArgs, 'getUsersInput'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddressResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['CountryCode'], ParentType, ContextType>;
  lineOne?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lineTwo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip?: Resolver<ResolversTypes['PostalCode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface CountryCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteUsersResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeleteUsersResponse'] = ResolversParentTypes['DeleteUsersResponse']> = ResolversObject<{
  deletedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type GetUsersResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetUsersResponse'] = ResolversParentTypes['GetUsersResponse']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['Stats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HistoricStatsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HistoricStats'] = ResolversParentTypes['HistoricStats']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['HistoricStatsId']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HistoricStatsIdResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HistoricStatsId'] = ResolversParentTypes['HistoricStatsId']> = ResolversObject<{
  DAY_OF_MONTH?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  DAY_OF_WEEK?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  DAY_OF_YEAR?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  HOUR?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  MILLISECONDS?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  MINUTES?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  MONTH?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  SECONDS?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  WEEK?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  YEAR?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export type LocalUserDetailsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LocalUserDetails'] = ResolversParentTypes['LocalUserDetails']> = ResolversObject<{
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginUserResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginUserResponse'] = ResolversParentTypes['LoginUserResponse']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MediaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembershipResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Membership'] = ResolversParentTypes['Membership']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  created_by?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  default?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  local?: Resolver<Maybe<ResolversTypes['LocalUserDetails']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['MembershipStatusEnum']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createUserInput'>>;
  deleteUsers?: Resolver<ResolversTypes['DeleteUsersResponse'], ParentType, ContextType, RequireFields<MutationDeleteUsersArgs, 'deleteUsersInput'>>;
  inviteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationInviteUserArgs, 'inviteUserInput'>>;
  loginUser?: Resolver<ResolversTypes['LoginUserResponse'], ParentType, ContextType>;
  switchUserMembership?: Resolver<ResolversTypes['LoginUserResponse'], ParentType, ContextType, RequireFields<MutationSwitchUserMembershipArgs, 'switchUserMembershipInput'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateUserInput'>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _entities?: Resolver<Array<Maybe<ResolversTypes['_Entity']>>, ParentType, ContextType, RequireFields<Query_EntitiesArgs, 'representations'>>;
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
  getUsers?: Resolver<ResolversTypes['GetUsersResponse'], ParentType, ContextType, RequireFields<QueryGetUsersArgs, 'getUsersInput'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type StatsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  history?: Resolver<Maybe<Array<ResolversTypes['HistoricStats']>>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  remaining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  created_by?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memberships?: Resolver<Array<ResolversTypes['Membership']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface _AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any';
}

export type _EntityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Entity'] = ResolversParentTypes['_Entity']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Account' | 'Media' | 'User', ParentType, ContextType>;
}>;

export type _ServiceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']> = ResolversObject<{
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Federation__FieldSetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['federation__FieldSet'], any> {
  name: 'federation__FieldSet';
}

export interface Link__ImportScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['link__Import'], any> {
  name: 'link__Import';
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  CountryCode?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DeleteUsersResponse?: DeleteUsersResponseResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  GetUsersResponse?: GetUsersResponseResolvers<ContextType>;
  HistoricStats?: HistoricStatsResolvers<ContextType>;
  HistoricStatsId?: HistoricStatsIdResolvers<ContextType>;
  JWT?: GraphQLScalarType;
  LocalUserDetails?: LocalUserDetailsResolvers<ContextType>;
  LoginUserResponse?: LoginUserResponseResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  Membership?: MembershipResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  _Any?: GraphQLScalarType;
  _Entity?: _EntityResolvers<ContextType>;
  _Service?: _ServiceResolvers<ContextType>;
  federation__FieldSet?: GraphQLScalarType;
  link__Import?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  federation__extends?: Federation__ExtendsDirectiveResolver<any, any, ContextType>;
  federation__inaccessible?: Federation__InaccessibleDirectiveResolver<any, any, ContextType>;
  federation__override?: Federation__OverrideDirectiveResolver<any, any, ContextType>;
  federation__provides?: Federation__ProvidesDirectiveResolver<any, any, ContextType>;
  federation__tag?: Federation__TagDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  shareable?: ShareableDirectiveResolver<any, any, ContextType>;
}>;
